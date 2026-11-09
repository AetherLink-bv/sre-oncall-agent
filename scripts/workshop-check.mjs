#!/usr/bin/env node
// Workshop consistency check for sre-oncall-agent.
//   node scripts/workshop-check.mjs            report the cut markers in the checked-out tree
//   node scripts/workshop-check.mjs --expect-start   assert: all cut markers present (workshop/start)
//   node scripts/workshop-check.mjs --expect-solved  assert: no markers (completed teaching copy)
// Local only; node built-ins. Exit 0 = consistent, 1 = inconsistent, 2 = bad usage.
import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import { parseSolo } from "../course/ai-sdlc-mod/hooks/lesson.js";

const MARKERS = [
  ["A3 contract rules", "src/contract.ts", /TODO\(A3\)/],
  ["A4 chat refusal", "src/chat.ts", /TODO\(A4\)/],
  ["A4 guard rule", ".claude/hooks/guard.mjs", /TODO\(A4\)/],
  ["A5 list_deploys", "src/tools.ts", /TODO\(A5\)/],
  ["A8 executor gate", "src/executor.ts", /TODO\(A8\)/],
];

const mode = process.argv[2] ?? "report";
if (!["report", "--expect-start", "--expect-solved", "--self-test"].includes(mode)) {
  console.error("usage: workshop-check.mjs [--expect-start|--expect-solved|--self-test]");
  process.exit(2);
}

function validateWorkshopDocs(solo, workshop, readme) {
  const problems = [];
  let assignments = [];
  try {
    assignments = parseSolo(solo);
  } catch (error) {
    problems.push(error instanceof Error ? error.message : String(error));
  }

  if (assignments.length === 6) {
    if (!readme.includes("SOLO.md#a1-map-the-repo-and-prove-setup")) problems.push("README does not link to the A1 SOLO section");
    if (!workshop.includes("[SOLO.md](SOLO.md)")) problems.push("WORKSHOP does not link to SOLO.md");
    for (const assignment of assignments) {
      if (!workshop.includes(`| ${assignment.id} |`)) problems.push(`WORKSHOP route is missing the ${assignment.id} core row`);
    }
  }

  if (!/^## Optional A7\./m.test(solo)) problems.push("SOLO is missing optional A7");
  if (!/^## Optional A9\./m.test(solo)) problems.push("SOLO is missing optional A9");
  if (!/A7 and A9\s+remain optional\./m.test(readme)) problems.push("README does not keep A7 and A9 optional");

  const docs = `${solo}\n${workshop}\n${readme}`;
  if (/\bgit\s+(?:checkout|switch|diff)\s+[^\n]*(?:w5-step|solved)/i.test(docs)) {
    problems.push("docs copy from an old step or solved branch");
  }

  const boundaries = [
    [/Human review\.\*\* Edit `\.claude\/hooks\/guard\.mjs` by hand\./, "A4 human hook edit"],
    [/Do not inspect approvals\/audit\.jsonl or edit \.claude\//, "A4 agent edit prohibition"],
    [/Run the approved four-window sequence/, "A6 human process start"],
    [/Do not run or stop processes\./, "A6 agent process prohibition"],
    [/Do not create an approval or click Approve, Execute, or Resolve\./, "A8 human action boundary"],
    [/Do not edit lessons\/lessons\.md or claim that the lesson was promoted\./, "A9 human promotion boundary"],
  ];
  for (const [pattern, label] of boundaries) if (!pattern.test(solo)) problems.push(`missing ${label}`);
  if (/Resolve the sample incident yourself/.test(solo)) problems.push("docs require a human resolution to complete the workshop");

  return { ok: problems.length === 0, problems, assignments };
}

let present = 0;
for (const [label, file, re] of MARKERS) {
  const hit = existsSync(file) && re.test(readFileSync(file, "utf8"));
  present += hit ? 1 : 0;
  console.log(`${hit ? "stub" : "done"}  ${label.padEnd(20)} ${file}`);
}
const workshopSuite = existsSync("test/workshop") && existsSync("test/workshop/contract.test.ts");
console.log(`${workshopSuite ? "ok  " : "MISS"}  workshop suite       test/workshop/*.test.ts`);
const solo = readFileSync("SOLO.md", "utf8");
const workshop = readFileSync("WORKSHOP.md", "utf8");
const readme = readFileSync("README.md", "utf8");
const docs = validateWorkshopDocs(solo, workshop, readme);
console.log(`${docs.ok ? "ok  " : "MISS"}  prompt-first docs    6 core SOLO sections + optional depth + human gates`);
for (const problem of docs.problems) console.log(`      - ${problem}`);

if (mode === "--self-test") {
  assert.equal(docs.ok, true, "current workshop docs must be valid");
  assert.equal(validateWorkshopDocs(`${solo}\ngit checkout w5-step-4`, workshop, readme).ok, false);
  assert.equal(validateWorkshopDocs(solo.replace("Do not run or stop processes.", ""), workshop, readme).ok, false);
  assert.equal(validateWorkshopDocs(solo.replace(/^## Optional A9\.[\s\S]*?(?=^## Hackathon handoff recap)/m, ""), workshop, readme).ok, false);
  assert.equal(validateWorkshopDocs(solo, workshop.replace("| A5 |", "| Missing |"), readme).ok, false);
  console.log("\nworkshop:check self-test PASS");
  process.exit(0);
}

if (mode === "--expect-start" && (present !== MARKERS.length || !workshopSuite || !docs.ok)) {
  console.error(`\nworkshop:check FAIL — expected ${MARKERS.length} cut markers, found ${present}`);
  process.exit(1);
}
if (mode === "--expect-solved" && (present !== 0 || !workshopSuite || !docs.ok)) {
  console.error(`\nworkshop:check FAIL — expected no cut markers, found ${present}`);
  process.exit(1);
}
console.log(`\nworkshop:check ${mode === "report" ? `— ${present}/${MARKERS.length} markers` : "PASS"}`);
