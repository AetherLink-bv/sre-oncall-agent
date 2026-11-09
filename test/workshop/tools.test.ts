// Workshop A5 — a read-only tool: list_deploys bound to its capability.
// Red on workshop/start; rebuild in src/tools.ts.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { createTelemetryServer, handlers } from "../../src/tools.js";
import { loadTelemetry } from "../../src/telemetry.js";
import { offlineVerdict } from "../../src/runtime.js";

test("A5: list_deploys is bound to telemetry.listDeploys and returns deploys", async () => {
  const t = await loadTelemetry("fixtures/telemetry/bad-deploy.json");
  if (!t.ok) throw new Error("fixture telemetry missing");
  const deploys = handlers(t.value).list_deploys({});
  assert.ok(Array.isArray(deploys), "handler must return the deploy list");
  assert.ok(deploys.length >= 1, "fixture has at least one deploy");
});

test("A5 edge: an empty time window returns [] and is unknown, never healthy", async () => {
  const t = await loadTelemetry("fixtures/telemetry/bad-deploy.json");
  if (!t.ok) throw new Error("fixture telemetry missing");
  const at = "2000-01-01T00:00:00.000Z";
  const empty = handlers(t.value).list_deploys({ since: at, until: at });
  assert.deepEqual([...empty], [], "an empty window must return []");

  const verdict = offlineVerdict(
    { incident_id: "INC-EMPTY", service: t.value.service, alert: "empty window", fired_at: at },
    t.value,
  );
  assert.ok(
    verdict.data_gaps.includes("list_deploys: no deploys in the window"),
    "an empty deploy window must be recorded as a data gap",
  );
  assert.notEqual(verdict.confidence, "high", "no deploy data must never support high confidence");
  assert.equal(verdict.confidence, "low", "no metric points must remain low confidence");
  assert.equal(verdict.proposal, "investigate-more", "unknown telemetry must request more investigation");
  assert.match(verdict.customer_impact, /^OPEN/, "customer impact must remain OPEN");
  assert.match(verdict.blast_radius, /^OPEN/, "blast radius must remain OPEN");
  assert.ok(
    !verdict.ruled_out.some((reason) => reason.startsWith("bad deploy")),
    "an empty window must not rule out a bad deploy",
  );
  assert.ok(
    !verdict.customer_impact.includes("none observed"),
    "missing telemetry must not be described as no impact",
  );
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
