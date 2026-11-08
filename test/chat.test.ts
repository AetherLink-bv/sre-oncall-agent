import assert from "node:assert/strict";
import { test } from "node:test";
import { ask, routeMessage } from "../src/chat.js";
import { loadTelemetry } from "../src/telemetry.js";

test("watch commands route to the grammar, not the model", () => {
  const r = routeMessage("Watch the next deployment for five minutes.");
  assert.equal(r.kind, "watch");
  assert.equal(routeMessage("Stop the deployment watch.").kind, "stop");
});

test("mutations in chat are refused — they are buttons for a named human", () => {
  for (const t of [
    "Roll back the deploy", "approve", "please resolve this", "scale up the API", "mark it resolved",
    "scale checkout to 5 replicas", "give approval", "mark this incident resolved",
    "roll back now", "flip the flag", "set flag off", "close the incident", "approve the rollback",
  ]) {
    assert.equal(routeMessage(t).kind, "refused", t);
  }
});

test("investigate phrasings start the triage loop with the alert text", () => {
  const r = routeMessage("Investigate: customers report checkout errors");
  assert.equal(r.kind, "investigate");
  if (r.kind === "investigate") assert.equal(r.alert, "customers report checkout errors");
  assert.equal(routeMessage("Something is broken: payments time out").kind, "investigate");
});

test("a malformed watch command is refused with the grammar error, not treated as a question", () => {
  const r = routeMessage("Watch the next deployment and roll back if it fails.");
  assert.equal(r.kind, "refused");
});

test("everything else is a read-only question", () => {
  assert.equal(routeMessage("How is production doing?").kind, "question");
});

test("the offline A6 challenge answer cites replayable snapshot evidence", async () => {
  const telemetry = await loadTelemetry("fixtures/telemetry/bad-deploy.json");
  assert.equal(telemetry.ok, true);
  if (!telemetry.ok) throw new Error("unreachable");

  const answer = await ask("Could this be something other than the deployment?", { telemetry: telemetry.value });
  assert.match(answer, /^\(offline investigator — scripted, not model evidence\)/);
  assert.match(answer, /Stored telemetry snapshot \[metrics:2026-10-05T03:45:00\.000Z\]/);
  assert.match(answer, /\[deploys:d-4821\]/);
  assert.match(answer, /\[logs:2026-10-05T03:45:03\.000Z\]/);
  assert.match(answer, /not a live current-health check/);
});
