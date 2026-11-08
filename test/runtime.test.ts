import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { resolveRuntime, runtimeModel, sdkQuery } from "../src/runtime.js";
import { loadTelemetry } from "../src/telemetry.js";

test("real runtime is the default and offline requires an explicit selection", async () => {
  const telemetry = await loadTelemetry("fixtures/telemetry/bad-deploy.json");
  assert.ok(telemetry.ok);
  const previous = process.env.AGENT_MODEL;
  delete process.env.AGENT_MODEL;
  try {
    const runtime = resolveRuntime(telemetry.value);
    assert.equal(runtime.model, "sonnet");
    assert.equal(runtime.label, "claude-agent-sdk/sonnet");
    assert.equal(runtime.query, sdkQuery);
    assert.equal(runtimeModel("  "), "sonnet");
    process.env.AGENT_MODEL = "haiku";
    assert.equal(resolveRuntime(telemetry.value).model, "haiku");
    const offline = resolveRuntime(telemetry.value, "offline");
    assert.equal(offline.model, undefined);
    assert.notEqual(offline.query, sdkQuery);
    assert.match(offline.label, /scripted, not model evidence/);
  } finally {
    if (previous === undefined) delete process.env.AGENT_MODEL;
    else process.env.AGENT_MODEL = previous;
  }
});

test("the SDK adapter overrides caller settings with explicit product context", async () => {
  const source = await readFile("src/runtime.ts", "utf8");
  assert.match(source, /settingSources: \[\],[\s\S]*strictMcpConfig: true,[\s\S]*CLAUDE_CODE_DISABLE_AUTO_MEMORY: "1"[\s\S]*"no-chrome": null/);
});
