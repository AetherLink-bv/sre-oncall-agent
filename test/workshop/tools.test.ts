// Workshop A5 — a read-only tool: list_deploys bound to its capability.
// Red on workshop/start; rebuild in src/tools.ts.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { createTelemetryServer, handlers } from "../../src/tools.js";
import { loadTelemetry } from "../../src/telemetry.js";

test("A5: list_deploys is bound to telemetry.listDeploys and returns deploys", async () => {
  const t = await loadTelemetry("fixtures/telemetry/bad-deploy.json");
  if (!t.ok) throw new Error("fixture telemetry missing");
  const deploys = handlers(t.value).list_deploys({});
  assert.ok(Array.isArray(deploys), "handler must return the deploy list");
  assert.ok(deploys.length >= 1, "fixture has at least one deploy");
});

test("A5: list_deploys is registered on the telemetry MCP server", async () => {
  const t = await loadTelemetry("fixtures/telemetry/bad-deploy.json");
  if (!t.ok) throw new Error("fixture telemetry missing");
  const server = createTelemetryServer(t.value);
  const inst = server.instance as unknown as { _registeredTools?: Record<string, unknown>; server?: { _registeredTools?: Record<string, unknown> } };
  const registered = inst._registeredTools ?? inst.server?._registeredTools ?? {};
  assert.ok("list_deploys" in registered, "server must register a list_deploys tool");
});

test("A5: chat and offline runtime use the shared list_deploys capability", async () => {
  for (const file of ["src/chat.ts", "src/runtime.ts"]) {
    const source = await readFile(file, "utf8");
    assert.match(source, /handlers\(t\)/, `${file} must construct the shared capability handlers`);
    assert.match(source, /\.list_deploys\(/, `${file} must call the shared list_deploys capability`);
    assert.doesNotMatch(source, /\blistDeploys\s*\(/, `${file} must not bypass the shared capability`);
  }
});
