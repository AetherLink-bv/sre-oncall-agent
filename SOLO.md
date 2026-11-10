# Build the AI SRE first responder with Claude Code

Claude Code is the builder. The SRE agent is the product. The required route
uses fictional fixtures and the scripted investigator. It does not prove a
live model run.

An **incident** is a detected service problem with an id, state, and evidence.
A **fixture** is fictional test data that makes one case repeatable. A
**proposal** is the agent's suggested next step. An **approval** is a named
human decision for one exact incident and proposal. Fixture incident
`INC-1001` is different from the live incident that A6 creates.

## Set up once

Use Terminal 2 for commands. On Windows, use Git Bash for every shown POSIX
command. Check Node before cloning. Continue only on v22 or newer. If it is
v21.6, stop and use the approved Node 22 setup for this laptop.

```sh
node --version
git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
claude --setting-sources project --strict-mcp-config --no-chrome
```

Accept folder trust only for your own participant clone. Project settings turn
off auto memory. A real Worldline-managed laptop and proxy dry run remains
`OPEN`.

## A1. Map the repository and prove setup

1. **Type this in: Claude Code.** Paste the map prompt. **After:** both intake paths and the shared runtime are named.
2. **Type this in: Claude Code.** Paste the environment prompt. **After:** Node, dependencies, fixtures, and the diff are checked.
3. **Type this in: Claude Code.** Paste the test prompt. **After:** main passes and only A3, A4, A5, and A8 remain expected-red.
4. **Type this in: two new Git Bash windows.** Start the shop and the traffic (commands below), then paste the console prompt in Claude Code. Keep all three running all day. **After:** port ownership, health, and the local URL are visible.
5. **Open in browser: http://localhost:4320.** Review the console. **After:** the header shows `shop online · v2.14.0 healthy` and there are no incidents yet: the shop is healthy.

```text
/show-me Read CLAUDE.md and fixtures/incidents/bad-deploy.json. Inspect only src/cli.ts, console/server.ts, and src/agent.ts. Map the fixture CLI for INC-1001 and the live console listener. Show where both call the shared investigate flow. Stay read-only. Name the three entry files and one shared runtime file, then stop.
```

```text
Use the repository map we reviewed. Require Node 22 or newer. Check the current diff and whether dependencies are present. Use npm ci only when dependencies are missing. Generate the sample fixtures. Show the commands and results, then stop for my environment review. Do not start a server or solve a TODO.
```

```text
Run the main tests and the workshop tests. Explain why A3, A4, A5, and A8 are expected to fail. Do not solve them. Show the exact pass and expected-red counts, then stop for my test review.
```

The console reads its live telemetry from the shop (`demo/data/telemetry.json`, written by `npm run shop`). Start the shop and the traffic first, each in its own window:

```sh
npm run shop
npm run traffic
```

```text
Check port 4320. If it is free, start the console with AGENT_LISTEN_WINDOW_MIN=1. If it is occupied, identify the process without stopping it. Show the console health and local URL. Do not stop or replace an existing process. Stop for my setup review.
```

## A2. Write a reviewed operator intent

1. **Type this in: Claude Code.** Paste the design prompt. **After:** one field map answers at most three questions.
2. **Human review.** Choose the operator and observable outcome. **After:** wishes are removed from the checks.
3. **Type this in: Claude Code.** Paste the write prompt. **After:** one exact `intent.md` diff is visible.
4. **Human review.** Accept or reject the diff. **After:** three checks and human decisions are explicit.

```text
/design-control-loop Read intent.md, fixtures/incidents/bad-deploy.json, and REVIEW.md. Ask at most three questions in one round about the operator, observable outcome, and read-only boundary. Recommend one answer for each question. Map my answers to intent.md fields. Stay in design mode. Do not edit or build. Stop after the field map.
```

```text
Use the accepted field map. Propose an exact intent.md diff with one operator outcome, three repeatable checks, the sample-data boundary, and the named human decisions. Wait for my approval. After I approve, edit only intent.md and show the diff. Do not build or push.
```

## A3. Build and verify the verdict contract

1. **Type this in: Claude Code.** Paste the contract prompt. **After:** one invalid verdict must fail.
2. **Type this in: Claude Code.** Paste the scope prompt. **After:** five verdict rules and about nine required files are visible before editing.
3. **Type this in: Claude Code.** Paste the implementation prompt. **After:** the focused test turns green and the diff stays bounded.
4. **Type this in: Claude Code.** Paste the proof and verification prompts. **After:** customer impact is visible in the CLI output and the verdict is evidence-backed.
5. **Type this in: the console window.** Press Ctrl+C and start the console again, so it loads the new contract. **After:** the shop and traffic keep running.
6. **Open in browser: http://localhost:4320.** Click “+ New investigation”, then “Investigate: customers report checkout errors”. **After:** the diagnosis shows a Customer impact row. The live shop is healthy, so it says `none observed` (INC-1001 is the fixture; the console investigates the live shop).
7. **Human review.** Inspect the contract, diff, and outputs. **After:** unsupported customer claims remain `OPEN`.

```text
Read the accepted intent.md, docs/spec.md, src/contract.ts, src/runtime.ts, src/prompts.ts, and the A3 workshop test. Explain the verdict contract in plain English. Propose the smallest change that requires non-empty customer_impact, keeps unsupported claims OPEN, and keeps the offline and optional model schemas aligned. Keep versions, regions, and customer segments OPEN unless the cited metric establishes them. Do not edit. Stop for my contract review.
```

```text
Use the accepted contract. Run only the focused A3 test. Explain the red assertion before editing. List the files that must change and why. Do not edit yet. Stop for my build-scope review.
```

```text
Implement the accepted A3 scope. Update TODO(A3), docs/spec.md, the contract and prompt schemas, every offline verdict branch, the affected fixtures, and the customer_impact output in src/cli.ts and console/index.html. Do not change unrelated scaffolding. Rerun only the focused A3 test and show the diff. Do not approve, execute, resolve, or push.
```

```text
Run the main tests, typecheck, and the offline investigation. Show customer_impact in the exact CLI output. Keep unsupported versions, regions, and customer segments OPEN. Report any failure before editing again. Do not push.
```

```text
/verify-this Verify this claim: the A3 verdict contract cannot pass without non-empty customer_impact and the offline investigation still reports customer impact. Use the accepted spec, the focused A3 test, the main tests, typecheck, and the offline output. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with file and output references. Stay read-only.
```

### A3 catch-up

Use the reviewed `day5-after-a3` tag only when you cannot finish A3. These
commands save dirty and untracked work before they create a separate branch:

```sh
git status --short
git stash push -u -m "before Day 5 A3 catch-up"
git switch -c day5-catch-up-a3 day5-after-a3
```

Your earlier work stays in the stash. Inspect the checkpoint before you restore
selected files. Never use a blind checkout or reset.

## A4. Refuse unsafe chat actions and prove the human guard

1. **Type this in: Claude Code.** Paste the chat prompt. **After:** the full A6 evidence question passes and “Do not approve and roll back now.” is refused.
2. **Human review.** Edit `.claude/hooks/guard.mjs` by hand. **After:** `bench/ratchet.json` is human-owned.
3. **Type this in: Claude Code.** Paste the guard-review prompt. **After:** the focused test records Edit and Write denial.
4. **Human review.** Inspect the audit result. **After:** no one claims full shell protection.

```text
Read intent.md, src/chat.ts, and test/workshop/chat.test.ts. Explain the chat-refusal contract. Add a named MUTATION regex constant. Keep the full A6 evidence question ending with "Do not approve or execute anything." read-only. Refuse "Do not approve and roll back now." as a mutation. Show the focused chat test red, then implement only TODO(A4) in src/chat.ts. Rerun the focused chat test and show its output and the diff. Do not inspect approvals/audit.jsonl or edit .claude/, approvals/, lessons/lessons.md, PROGRESS.md, or bench/ratchet.json. Stop before the human hook step.
```

The named participant replaces the `TODO(A4)` comment immediately before
`else if (SDLC_ARTEFACT.test(rel))` with this rule:

```js
else if (rel === "bench/ratchet.json")
  decide("deny", "guard: ratchet is human-owned");
```

```text
Read the human edit in .claude/hooks/guard.mjs and test/workshop/guard.test.ts. Do not edit either file. Run only the focused guard test. Explain whether Edit and Write to bench/ratchet.json are denied. Do not claim that the hook blocks every shell command. Stop for my review.
```

## A5. Build one read-only deploy tool

1. **Type this in: Claude Code.** Paste the A5 prompt. **After:** the handler, bypasses, and focused red test are visible.
2. **Human review.** Choose the empty-window or missing-deploy case. **After:** the edge case is explicit.
3. **Type this in: Claude Code.** Continue after approval. **After:** focused, main, typecheck, and offline results are visible.
4. **Human review.** Inspect exact trace arguments. **After:** no mutation tool exists.

```text
Read intent.md, src/tools.ts, src/runtime.ts, src/chat.ts, and test/workshop/tools.test.ts. Explain how list_deploys stays read-only and where its trace arguments are recorded. Show the three starter bypasses. Show the focused A5 test red. After my approval, implement TODO(A5) in src/tools.ts and remove the bypasses from src/runtime.ts and src/chat.ts. Add either an empty-window or missing-deploy case. Rerun the focused test, the main tests, typecheck, and the offline investigation. Show the tool result and exact trace arguments. Do not add a mutation tool or push.
```

### A5 catch-up

Use the reviewed `day5-after-a5` tag only when you cannot finish A5:

```sh
git status --short
git stash push -u -m "before Day 5 A5 catch-up"
git switch -c day5-catch-up-a5 day5-after-a5
```

Your earlier work stays in the stash. Inspect the checkpoint before you restore
selected files. Do not overwrite the A4 human hook rule.

## A6. Run the live counterpart and prove the human gate

1. **Type this in: Claude Code.** Paste the route-map prompt. **After:** fixture and live incident paths stay separate.
2. **Type this in: Claude Code.** Paste the demo-plan prompt. **After:** Claude gives commands but starts no process.
3. **Type this in: the console window and Window 4.** The shop and traffic run since A1. Restart only the console, then run chaos once. **After:** a new listener incident exists.
4. **Open in browser: http://localhost:4320.** Ask the three challenge prompts. **After:** refs stay stable, the offline alternative answer is labelled scripted fixture output, and rollback chat is refused.
5. **Human review.** Run the A8 gate checkpoint. **After:** a mismatch stays blocked and real approval remains `HUMAN OPEN`.

```text
/show-me Read docs/plan.md, fixtures/incidents/bad-deploy.json, and the shop, traffic, chaos, and console scripts. Map the fixture CLI for INC-1001 and the listener-created live incident. Show where both use the shared investigate flow and tool trace. Stay read-only. Separate fixture output from optional model output, then stop.
```

```text
Use the incident path we reviewed. Propose the demo order, risks, proof, rollback, and one alternative cause. Reuse owned processes. Keep diagnosis-snapshot evidence separate from current telemetry, mark missing evidence OPEN, and leave approval, execution, and resolution to the human. Do not run or stop processes. Wait for my approval.
```

The console, shop, and traffic already run since A1. Restart only the console (Ctrl+C first), so it loads your A4 and A5 code:

```sh
AGENT_LISTEN_WINDOW_MIN=1 npm run console
```

The shop has been healthy since A1, so that is your healthy baseline. Use Window 4 once:

```sh
npm run chaos -- deploy v2.15.0 --mode bad-deploy
```

Allow about one minute for the listener to create the incident.

```text
Which evidence supports the proposed rollback? Show stable source:ref labels. Separate the diagnosis snapshot from current telemetry. Do not approve or execute anything.
```

```text
Could this be something other than the deployment? Label the repeated offline snapshot summary as scripted fixture output, not alternative reasoning or model evidence.
```

```text
Roll back now.
```

### Human gate check (A8)

Keep the stable A8 test and TODO id. This is a required A6 checkpoint, not an
eighth assignment.

```text
Read intent.md, src/executor.ts, approvals/README.md, and the A8 workshop test. Explain the exact incident-and-action match. Show the focused test red. After my approval, implement only TODO(A8). Keep the existing wrong-incident and wrong-action cases. Rerun the focused test, main tests, and typecheck. Show both mismatches blocked. Do not create an approval or click Approve, Execute, or Resolve. Stop with the console action HUMAN OPEN.
```

### A6 catch-up

Use the reviewed `day5-after-a6` tag only when you cannot finish A6:

```sh
git status --short
git stash push -u -m "before Day 5 A6 catch-up"
git switch -c day5-catch-up-a6 day5-after-a6
```

Your earlier work stays in the stash. Inspect the checkpoint before you restore
selected files. The checkpoint creates no approval and executes no action.

## Optional A7. Add one deterministic fixture case

This proves fixture policy only. It does not prove live model behavior.

```text
Read bench/cases.json, bench/ratchet.json, and the current bench results. Explain what the offline bench proves and what it does not prove. Save a baseline. Propose one deterministic case that reuses the bad-deploy data with the alert text "Customers report checkout problems" and wait for approval. Add the case without weakening existing cases or lowering the score floor. Save the treatment result and rerun one neighboring case. Show the diff, case count, pass result, and harmful count. Do not claim live model resistance or push.
```

```text
/verify-this Verify that the new deterministic case increases the case count by one, passes, keeps harmful at 0, and leaves both ratchet values unchanged. Compare the saved baseline and treatment outputs. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with evidence references. Stay read-only.
```

## Optional A9. Propose one reusable lesson

Human lesson promotion remains `OPEN`.

```text
Read docs/diagnosis-live.md, lessons/proposed/, lessons/lessons.md, approvals/audit.jsonl, and PROGRESS.md. Explain the difference between curated knowledge, the action log, and local progress signals. Detect whether docs/diagnosis-live.md is still a placeholder. If it is, report the lesson proposal as HUMAN OPEN and stop. Do not edit any file.
```

```text
Ask the named human to confirm that docs/diagnosis-live.md contains the reviewed current-run incident id and stable evidence references. If that confirmation is missing, stop with HUMAN OPEN. Otherwise, propose one reusable lesson from only those reviewed references. Keep unsupported claims OPEN. Write only under lessons/proposed/ after I approve the exact wording. Do not edit lessons/lessons.md or claim that the lesson was promoted. Show the diff, then stop.
```

## Hackathon handoff recap

This recap follows the six required assignments. It is not a seventh required
assignment.

```text
/handoff Create a handoff prompt for the next teammate. Include the accepted intent, verified checks with evidence references, every HUMAN OPEN item, the hackathon intent, and one next step. Do not claim that the incident was resolved, the lesson was promoted, or a human action happened. Print the full handoff for review. Stop before editing any file.
```

```text
Save the exact handoff text I approved to HANDOFF.md. Ask before writing the file. Do not add claims or change the reviewed wording. Show the diff, then stop. Do not push.
```

## Appendix: optional live product model

Run this only after the six required assignments. Use your own local login and
approved usage. Never print or copy credentials. Use Git Bash on Windows.

```text
Read README.md, src/runtime.ts, src/e2e.ts, console/server.ts, and package.json. Explain the difference between my local Claude Code builder session and the optional Claude Agent SDK product runtime. Check only whether Claude Code is signed in and whether npm run doctor reports the Claude Code login path. Never print, read, or copy credentials. Propose one bounded CLI proof with max-turns 8 and max-budget-usd 0.30, followed by an optional console restart with AGENT_MODEL=sonnet. Require one completed diagnosis and its tool trace. State that the budget is checked between turns and can be exceeded by one turn. Include the fallback that restarts without AGENT_MODEL. Do not run a paid model, edit files, or start processes. Stop for my review.
```

The console has no global model-budget guard. A model name proves configuration,
not a completed model run. The Worldline laptop and proxy check remains `OPEN`.

## Appendix: public skills pack and completed runtime

The repository already contains the project skills required for A1 through A6.
Do not bulk-install the public skills pack. Use `CARD.md` and `WORKSHOP.md`
on `main` for the separate completed-runtime checkpoint course.
