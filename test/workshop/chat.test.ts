// Workshop A4 — chat routing: mutations in chat are refused; they are buttons
// for a named human. Red on workshop/start; rebuild in src/chat.ts.
import assert from "node:assert/strict";
import { test } from "node:test";
import { routeMessage } from "../../src/chat.js";

test("A4: mutations in chat are refused — they are buttons for a named human", () => {
  for (const t of [
    "Roll back the deploy", "approve", "please resolve this", "scale up the API", "mark it resolved",
    "scale checkout to 5 replicas", "give approval", "mark this incident resolved",
    "roll back now", "flip the flag", "set flag off", "close the incident", "approve the rollback",
  ]) {
    assert.equal(routeMessage(t).kind, "refused", t);
  }
});

test("A4: refusal still lets watches and investigations through", () => {
  assert.equal(routeMessage("Watch the next deployment for five minutes.").kind, "watch");
  assert.equal(routeMessage("Investigate: customers report checkout errors").kind, "investigate");
  assert.equal(routeMessage("What did the logs say?").kind, "question");
});

test("A4: the A6 evidence question stays read-only without weakening refusal", () => {
  assert.equal(routeMessage("Which evidence supports the proposed rollback? Show stable source:ref labels. Separate the diagnosis snapshot from current telemetry. Do not approve or execute anything.").kind, "question");
  for (const t of [
    "Roll back now.",
    "Can you roll back?",
    "Do not approve and roll back now.",
    "Which evidence supports the proposed rollback and can you execute it?",
    "Which evidence supports the proposed rollback? Roll back now.",
  ]) {
    assert.equal(routeMessage(t).kind, "refused", t);
  }
});
