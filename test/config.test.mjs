// Wiring checks for .claude/settings.json. npm run test:hooks
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";

const settings = JSON.parse(readFileSync(".claude/settings.json", "utf8"));

test("every configured hook is a quoted node command on a committed file", () => {
  const groups = ["PreToolUse", "PostToolUse", "SessionStart", "Stop"];
  const seen = new Set();
  for (const g of groups) {
    for (const entry of settings.hooks[g] ?? []) {
      for (const h of entry.hooks) {
        assert.equal(h.type, "command");
        assert.match(h.command, /^node "\$\{CLAUDE_PROJECT_DIR\}\/\.claude\/hooks\/[\w.-]+\.mjs"$/);
        seen.add(h.command);
      }
    }
  }
  for (const cmd of seen) {
    const file = cmd.replace(/^node "\$\{CLAUDE_PROJECT_DIR\}\//, "").replace(/"$/, "");
    assert.ok(existsSync(file), `${file} must exist in the repo`);
  }
  assert.equal(seen.size, 2, "guard.mjs + progress.mjs wired");
});

test("configured hooks launch when the project path contains spaces", () => {
  const dir = mkdtempSync(join(tmpdir(), "w5 hook path "));
  try {
    const hooksDir = join(dir, ".claude", "hooks");
    mkdirSync(hooksDir, { recursive: true });
    for (const file of ["guard.mjs", "progress.mjs"]) {
      writeFileSync(join(hooksDir, file), "process.stdout.write(process.argv[1]);\n");
    }
    for (const [event, entries] of Object.entries(settings.hooks)) {
      for (const entry of entries) {
        for (const hook of entry.hooks) {
          const result = spawnSync("sh", ["-c", hook.command], {
            cwd: dir,
            env: { ...process.env, CLAUDE_PROJECT_DIR: dir },
            encoding: "utf8",
          });
          assert.equal(result.status, 0, `${event}: ${result.stderr}`);
          assert.ok(result.stdout.startsWith(`${hooksDir}${sep}`), `${event}: ${result.stdout}`);
        }
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("PreToolUse matcher covers the gated tools", () => {
  const m = settings.hooks.PreToolUse[0].matcher;
  for (const t of ["Bash", "Read", "Grep", "Glob", "Write", "Edit", "MultiEdit"]) assert.ok(m.includes(t), t);
});

test("permission boundaries: secrets, approvals and bypass locked down", () => {
  const deny = settings.permissions.deny.join("\n");
  for (const p of ["WebFetch", "WebSearch", "**/.env*", "**/*.pem", "approvals/**", ".claude/**", "PROGRESS.md", "lessons/lessons.md", "npm run approve", "gh pr merge"]) {
    assert.ok(deny.includes(p), `deny must cover ${p}`);
  }
  assert.equal(settings.disableBypassPermissionsMode, "disable");
  assert.equal(settings.autoMemoryEnabled, false, "builder sessions must not load global auto memory");
});

test("the product SDK ignores builder context, auto memory and Claude in Chrome", () => {
  const source = readFileSync("src/runtime.ts", "utf8");
  assert.match(source, /settingSources: \[\],[\s\S]*strictMcpConfig: true,[\s\S]*CLAUDE_CODE_DISABLE_AUTO_MEMORY: "1"[\s\S]*"no-chrome": null/);
});

test("approve.mjs is not callable by the agent", () => {
  const deny = settings.permissions.deny.join("\n");
  assert.match(deny, /scripts\/approve|npm run approve/);
});

test("PROGRESS.md: the agent appends via npm run progress:note; Edit/Write stay denied", () => {
  const { allow, deny } = settings.permissions;
  assert.ok(allow.includes("Bash(npm run progress*)"), "progress:note is covered by the allow list");
  assert.ok(deny.includes("Edit(./PROGRESS.md)") && deny.includes("Write(./PROGRESS.md)"), "direct edits stay denied");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(pkg.scripts["progress:note"], "node scripts/progress-note.mjs");
});
