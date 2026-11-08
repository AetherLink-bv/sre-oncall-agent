# Build the AI SRE first responder with Claude Code

Claude Code is the builder. The on-call agent is the product that you build.
The product runs offline against scripted fictional evidence. A real model
investigator is optional and is not part of the core proof.

You make every product choice. You inspect every diff. You also perform every
human action. Claude Code may not approve, execute, resolve, edit `.claude/`,
promote a lesson, rewrite `PROGRESS.md`, or push.

## Open the project in a terminal

1. Clone the exercise branch.

   ```sh
   git clone --branch workshop/start --single-branch https://github.com/AetherLink-bv/sre-oncall-agent.git
   cd sre-oncall-agent
   ```

2. Review the current path and confirm that this is your own clone.
3. Run `claude --setting-sources project --strict-mcp-config --no-chrome` at the repository
   root. This workshop command loads project context without user or global
   settings. The repository disables auto memory for this bounded lesson. The
   separate SRE product runtime ignores builder settings and
   exposes only its explicit telemetry tools.
4. Review Claude Code's folder-trust prompt. Accept only when the displayed
   path is your own trusted clone. Never bypass trust for an unfamiliar folder.
5. Check that the project skills are available. Restart the same command if
   they remain missing after trust.

Cursor is optional. If it opens **Agents**, choose **IDE** and use its terminal.
The lesson only needs a terminal and browser. The repository already contains
the project skills. You do not need the full skills pack.

Do not ask Claude Code to rebuild the whole app. The starter already supplies
the local console, checkout shop, traffic, chaos, fictional fixtures, tests,
Zod contracts, and read-only tool infrastructure. You build the missing A3,
A4, A5, and A8 behavior. You also produce the intent, diagnosis evidence,
offline fixture coverage, human boundaries, and handoff.

Use one assignment at a time. Stop at each review point. If Claude shows no
visible progress for two minutes, ask:

```text
State the blocker and the next focused check.
```

Do not run the full suite after every prompt. Run the checks named by the
current assignment.

## A1. Map the repo and prove setup

Start with the project skill. The slash command must be the first text in the
prompt.

```text
/show-me Read CLAUDE.md and fixtures/incidents/bad-deploy.json. Then inspect only src/cli.ts, console/server.ts, and src/agent.ts. Give me a shallow map of two intake paths: the fixture CLI for INC-1001 and the live console listener that creates a new incident id from shop telemetry. Show where both paths call the shared investigate flow. Stay read-only. Do not generate HTML. Name those three entry files and one shared runtime file I should inspect next, then stop.
```

Review the map. You must be able to point to the fixture, runtime, trace, and
console before you continue.

```text
Use the repository map we just reviewed. Check Node and my current diff. Install dependencies only if they are missing, then generate the sample fixtures. Run the main tests. Run the workshop tests and explain why A3, A4, A5, and A8 are expected to fail. Do not solve them. Run npm run workshop:check only to locate unfinished markers; it is not a completion gate. Check port 4320. If it is free, start the console with AGENT_LISTEN_WINDOW_MIN=1. If it is occupied, do not stop the process. Report whether it belongs to this lab and whether its listener window is known. Show the console health and local URL. Do not push or change hooks. Stop for my setup review.
```

Open the local URL yourself. The main suite must pass. The workshop suite must
fail only at the unfinished A3, A4, A5, and A8 contracts.

If an owned console already uses port 4320 with an unknown or five-minute
listener window, choose one option before A6. Either accept the five-minute
wait, or approve a restart of only that owned console with the one-minute
classroom setting.

Choose which expected red assignment you want to inspect first. Stop when you
can explain the repo map, console health, and expected red tests.

## A2. Write a reviewed intent

Use one design round with at most three questions.

```text
/design-control-loop Read intent.md, fixtures/incidents/bad-deploy.json, and REVIEW.md. Ask me at most three questions in one round about the operator, the observable outcome, and the read-only boundary. Recommend an answer for each question. Map my answers to intent.md fields. Stay in design mode. Do not edit or build. Stop after the field map.
```

Reject a check that describes a wish. Choose an operator outcome and three
results that a stranger can repeat.

```text
Use the decisions from the design-control-loop interview. Propose an exact intent.md diff with one operator outcome, three checks a stranger can repeat, the sample-data boundary, and the named human decisions. Wait for my approval. After I approve, edit only intent.md and show the diff. Do not build or push.
```

Stop when `intent.md` names the operator, three repeatable checks, the
sample-data boundary, and the decisions that stay human-owned.

## A3. Build and verify the verdict contract

First agree on the contract. Do not edit code in this step.

```text
Read the accepted intent.md, docs/spec.md, src/contract.ts, src/runtime.ts, src/prompts.ts, and the A3 workshop test. Explain the current verdict contract in plain English. Propose the smallest contract change that requires non-empty customer_impact, keeps unsupported claims OPEN, and keeps the offline and optional real-model schemas aligned. Describe observed request failures or latency; keep affected versions, regions, and customer segments OPEN unless the cited metric establishes them. Do not edit code or tests. Stop for my contract review.
```

Choose one invalid verdict. Accept the contract only when that verdict must
fail.

```text
Use the contract I accepted. Run the focused A3 test and show the red assertion. Explain the failure before editing. Then implement the accepted A3 contract without weakening tests. Change TODO(A3), docs/spec.md, the contract schema and types, all offline runtime verdict branches, the real-model schema in src/prompts.ts, the relevant contract, approval, and executor fixtures that consume customer_impact, and display customer_impact in src/cli.ts and console/index.html. Do not change unrelated product scaffolding. Rerun the focused A3 test. Run the main tests, typecheck, and the offline investigation. Show the exact CLI output, console field, test outputs, and diff. Do not copy a solved implementation, approve, execute, resolve, or push.
```

Run the project skill as a separate read-only checkpoint.

```text
/verify-this Verify this claim: the A3 verdict contract cannot pass without non-empty customer_impact and the offline investigation still reports customer impact. Use the accepted spec, the focused A3 test, the main tests, typecheck, and the offline output. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with file and output references. Stay read-only.
```

Stop when you have the accepted contract, the original red assertion, the
small TODO(A3) diff, the green focused rerun, and the verification verdict.

## A4. Wire and prove the controls

Build the chat refusal first.

```text
Read intent.md, src/chat.ts, and test/workshop/chat.test.ts. Explain the chat-refusal contract in plain English. Add a named MUTATION regex constant because the progress hook checks it. Add a negative test that the read-only question "Was the deploy the cause?" remains a question and is not refused. Ask me to choose one extra operational mutation phrase. Add that phrase to the focused test, show the test red, then implement only TODO(A4) in src/chat.ts. Rerun the focused chat test and show the diff. Do not edit .claude/, approvals/, lessons/lessons.md, PROGRESS.md, or bench/ratchet.json. Do not approve or execute anything. Stop before the human hook step.
```

Choose one extra mutation phrase. Confirm that the focused chat test turns
green.

Now perform the human step. Edit `.claude/hooks/guard.mjs` yourself. Replace
the `TODO(A4)` comment immediately before
`else if (SDLC_ARTEFACT.test(rel))` with this exact rule:

```js
else if (rel === "bench/ratchet.json")
  decide("deny", "guard: ratchet is human-owned");
```

This rule denies the guarded file-edit tools for `bench/ratchet.json`.
Claude Code may not perform this edit.

```text
Read the human edit in .claude/hooks/guard.mjs and test/workshop/guard.test.ts. Do not edit either file. Run only the focused guard test. Explain whether Edit and Write to bench/ratchet.json are denied, and show the audit result. Do not claim that the hook blocks every shell command. Stop for my review.
```

Stop when chat refuses your phrase, the human-owned hook edit has a named
author, and the focused guard test records the expected denial. This hook
proves the file-edit boundary. It does not prove full shell protection.

## A5. Build a read-only deploy tool

```text
Read intent.md, src/tools.ts, src/runtime.ts, src/chat.ts, and test/workshop/tools.test.ts. Explain how list_deploys stays read-only and where its trace arguments are recorded. Show the three starter bypasses that read deploys without the new handler. Ask me to choose one edge case: an empty time window or a missing deploy. Show the focused A5 test red. After my approval, implement TODO(A5) in src/tools.ts and remove the list_deploys bypasses from src/runtime.ts and src/chat.ts so offline investigation and chat use the registered handler. Add my edge case and rerun the focused test. Then run the main tests, typecheck, and the offline investigation. Show the tool result and exact trace arguments. Do not add a mutation tool, approve, execute, resolve, or push.
```

Choose the empty-window or missing-deploy case. Inspect the handler, server
registration, tool result, and exact trace arguments.

Stop when `list_deploys` is registered, read-only, tested, and visible in the
offline trace. No rollback, approval, or mutation tool may exist.

## Optional after A5: connect the product model

Claude Code is already your local builder. The product runtime stays scripted
and offline for the required route. Its read-only tool path now exists. Connect
the product to the Claude Agent SDK only when your facilitator approves usage.

Use your own local login. Never copy a login, OAuth token, or API key to chat,
Git, a browser field, a remote host, or another participant. Current Anthropic
guidance says a local Agent SDK run can use your Claude Code login and consumes
your plan limits. An intentionally configured API key uses the linked Console
organization and may use paid API credits.

Use this prompt before starting the product model:

```text
Read README.md, src/runtime.ts, src/e2e.ts, console/server.ts, and package.json. Explain the difference between my local Claude Code builder session and the optional Claude Agent SDK product runtime. Check only whether Claude Code is signed in and whether npm run doctor reports the Claude Code login path; never print, read, or copy credentials. Propose the smallest local activation plan that keeps the core lesson offline, waits until after A5, first runs one CLI investigation with max-turns 8 and max-budget-usd 0.30, and only then optionally restarts my own console with AGENT_MODEL=sonnet. Require one completed model diagnosis plus its tool trace. State that the console has no global model-budget guard. Include the usage/cost warning and the fallback that restarts without AGENT_MODEL. Do not run a paid model, edit files, or start processes. Stop for my review.
```

Run one bounded fixture investigation first:

```sh
npm run investigate -- fixtures/incidents/bad-deploy.json --model sonnet --max-turns 8 --max-budget-usd 0.30 --dry-run
```

The SDK checks `--max-budget-usd` between model turns, so one turn can exceed
it. Strict MCP isolation keeps this lab's model context limited to telemetry.

Review the completed diagnosis, cost line, and tool trace. Only then may you
stop the console process that you started and launch the optional console path:

```sh
AGENT_MODEL=sonnet AGENT_LISTEN_WINDOW_MIN=1 npm run console
```

The console has no global model-budget guard. Submit at most one approved
`Investigate: ...` message. A model name in `/api/health` proves configuration
only. A completed diagnosis plus a visible tool trace proves that this run used
the model path. Stop after one accepted proof. If authentication, plan limits,
cost approval, or the model run fails, return to the scripted route:

```sh
env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console
```

Official references: [Agent SDK quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart)
and [use the Agent SDK with your Claude plan](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan).

## A6. Diagnose a live sample incident

Map the scripted incident path before you start processes.

```text
/show-me Read docs/plan.md, fixtures/incidents/bad-deploy.json, and the existing shop, traffic, chaos, and console scripts. Map two shallow paths: the fixture CLI for INC-1001 and the live listener that creates a new incident id from shop telemetry. Show where both paths use the shared investigate flow and tool trace. Stay read-only. Do not generate HTML. Separate scripted fixture output from optional model output, then stop.
```

Choose one alternative cause. Then ask Claude Code for the bounded plan and
the exact commands that you run yourself.

```text
Use the incident path we reviewed. Propose a local demo plan with files, order, risks, proof, rollback, and one alternative cause. Wait for my approval. Reuse running processes. After I approve, give me exact commands for separate terminals. I will start the console with AGENT_LISTEN_WINDOW_MIN=1, start the shop, keep healthy traffic running for two minutes to establish the before state, and then run the one-shot bad-deploy chaos command in its own terminal. Do not run chaos or stop processes yourself. When I confirm the incident exists, help me trace each diagnosis claim to a stable source:ref label. Keep diagnosis-snapshot evidence separate from current telemetry. Ask before writing docs/diagnosis-live.md. Mark missing evidence OPEN. Do not approve, execute, resolve, or push.
```

Run the approved commands in separate terminals. Start the console with
`AGENT_LISTEN_WINDOW_MIN=1`. Start the shop in another terminal. Keep healthy
traffic running in a third terminal for two minutes before the one-shot bad
deploy. This baseline supplies the before state for the later breakpoint
comparison. Run the one-shot command in a fourth terminal. Production keeps
the five-minute default. Do not stop a process that you did not start.

Open the incident and paste this question into the incident chat.

```text
Which evidence supports the proposed rollback? Show stable source:ref labels. Separate the diagnosis snapshot from current telemetry. Do not approve or execute anything.
```

The answer must use stable `metrics:`, `deploys:`, `diff:`, or `logs:`
references. It must not describe current telemetry as the earlier diagnosis
snapshot.

Paste the tested alternative-cause question into the incident chat.

```text
Could this be something other than the deployment?
```

The scripted chat may summarize evidence without comparing causes. If it does,
mark the cause comparison `OPEN`. Compare the alternative yourself with the
diagnosis `ruled_out` evidence. Do not claim that chat performed that review.

Now paste the mutation request into the incident chat.

```text
Roll back now.
```

Stop when the chat refuses, no decision record appears, and every diagnosis
claim maps to a stable evidence reference. Scripted output proves the fixture
pipeline. It is not live model evidence.

## A7. Add and verify an offline fixture case

The offline bench checks deterministic fixtures and policy results. It does
not prove resistance to live model prompt injection.

```text
Read bench/cases.json, bench/ratchet.json, the current bench results, and the bench tests. Explain what the offline scripted bench proves and what it does not prove. Run the bench before any edit and save its exact output plus the original case count and ratchet values under docs/verify/a7-offline-bench/baseline/. Ask me to choose one incident variation. Propose a deterministic fixture case and its expected policy result, then wait for my approval. After I approve, add the case without weakening existing cases or lowering the score floor. Run the bench again, save the exact output under docs/verify/a7-offline-bench/treatment/, and rerun one neighboring case. Show the diff, case count, pass result, and harmful count. Do not claim that this proves resistance to live model prompt injection. Do not alter hooks, approve, execute, resolve, or push.
```

Choose one deterministic incident variation. Review the expected policy result
before Claude Code adds the case.

```text
/verify-this Verify this claim: the new deterministic fixture case increases the case count by one, the new case passes, harmful remains 0, and both ratchet values are unchanged. Compare the saved baseline and treatment outputs and the neighboring rerun. Report VERIFIED, NOT VERIFIED, or INCONCLUSIVE with evidence references. Stay read-only.
```

Stop when the new fixture passes, `harmful` remains zero, the score floor is
unchanged, and the neighboring case agrees. A real model eval is optional and
outside the core route.

## A8. Build the approval gate

A gate blocks action until the approval matches the incident, action, and
named person.

```text
Read intent.md, src/executor.ts, approvals/README.md, and the A8 workshop test. Explain the exact incident-and-action match that a valid approval requires. Ask me to choose one negative case: wrong incident or wrong action. Show the focused A8 test red. After my approval, implement only TODO(A8), add the negative case, and rerun the focused test. Then run the main tests and typecheck. Show why the negative case stays blocked. Do not create an approval, click Approve, Execute, or Resolve, edit a human decision record, or push. Stop with the real console action marked HUMAN OPEN.
```

Choose the wrong-incident or wrong-action case. Inspect the negative result and
the exact TODO(A8) diff.

Do not operate the sample console as part of the automated assignment. Keep
Approve, Execute, and Resolve marked `HUMAN OPEN` until a named participant
chooses to perform them.

Stop when the focused and main checks pass, the chosen mismatch stays blocked,
and no approval or execution record was created by Claude Code.

## A9. Turn the lesson into a hackathon handoff

Day 4 separated curated `memory.md` from session context and technical logs.
Day 5 uses the same distinction:

- `lessons/lessons.md` contains human-reviewed operational knowledge.
- `approvals/audit.jsonl` records actions and decisions.
- `PROGRESS.md` records local signals. It does not prove validation.
- `HANDOFF.md` carries reviewed context and every open item to the next person.

```text
Read docs/diagnosis-live.md, lessons/proposed/, lessons/lessons.md, approvals/audit.jsonl, and PROGRESS.md. Explain the difference between curated operational knowledge, the action log, and local progress signals. Propose one reusable lesson with the incident id and stable evidence references. Do not edit lessons/lessons.md. Ask me which claim a human can accept and which claim must stay OPEN. Then interview me one question at a time about a hackathon problem. Draft docs/hackathon-intent.md with an outcome, three repeatable checks, boundaries, and OPEN questions. Show the proposed lesson and intent diff for review. Do not resolve the incident, promote the lesson, or push.
```

Choose one lesson claim and one hackathon problem. Keep human lesson promotion
and incident resolution `OPEN`.

The handoff skill normally creates a clipboard prompt. For this lesson, print
the full text first and stop before a file edit.

```text
/handoff Create a handoff prompt for the next teammate. Include the accepted intent, verified checks with evidence references, every HUMAN OPEN item, the hackathon intent, and one concrete next step. Do not claim that the incident was resolved, the lesson was promoted, or a human action happened. Distinguish forbidden service mutations from allowed local verification evidence writes under docs/verify/. For this classroom run, do not copy to the clipboard. Print the full handoff here for my review. Stop before editing any file.
```

Review the full handoff. After you approve the text, save it in a separate
step.

```text
Save the exact handoff text I just approved to HANDOFF.md. Ask before writing the file. Do not add new claims or change the reviewed wording. Show the diff, then stop. Do not push.
```

Ask a partner to read only `HANDOFF.md` and name the next step. Stop when the
partner can continue without guessing and every human action still appears as
`HUMAN OPEN`.

## After A9: choose one skill for the hackathon

The repository already included every project skill used in A1–A9. Keep the
reviewed handoff as your hackathon start point. Then open the public
[Claude Code skills pack](https://github.com/AetherLink-bv/claude-code-skills-pack)
for selective reuse. Do not bulk-install the pack or change global settings.

Clone the pack into a separate folder:

```sh
git clone https://github.com/AetherLink-bv/claude-code-skills-pack.git
cd claude-code-skills-pack
claude --setting-sources project --strict-mcp-config --no-chrome
```

Choose one skill. Ask Claude to propose a project-local install:

```text
Read README.md and inspect the skill I choose. Explain what it does and its requirements. Propose installing only that skill in my chosen project's .claude/skills folder. Check for an existing skill with that name and preserve it. Show the source and target paths. Ask for my approval before copying or replacing anything. Do not install the full pack, change global settings, or run the skill yet.
```

## Optional course mod

Start Claude Code with `claude --plugin-dir ./course/ai-sdlc-mod` and run
`/sdlc` to view A1 through A9 inside Claude Code. The mod reads the first prompt
from each `SOLO.md` assignment. It fills the input but does not submit it.

## Optional completed-runtime course

Open `course/index.html` after A1 through A9. The course explains the runtime,
contract, gate, and lessons flow. It is reference material. It does not replace
the red-to-green participant build.
