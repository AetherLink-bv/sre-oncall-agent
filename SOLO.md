# Build the AI SRE first responder with Claude Code

Use this path when you work alone. You build the same nine assignments as the
classroom route in `WORKSHOP.md`. Claude Code writes code and runs checks. You
choose the examples, inspect every diff, and make every human decision.

Everything runs locally with fictional data. Do not push, open a pull request,
or deploy from this lab. The agent may not approve, execute, resolve, edit
`.claude/`, or rewrite `PROGRESS.md`.

## Start on the exercise branch

```bash
git clone https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
git switch workshop/start
claude
```

Stay on `workshop/start` for all nine assignments; the current `main` branch teaches a separate completed-runtime course.

Run `/status` in Claude Code. Confirm that the guard and progress hooks are
active. Use one assignment at a time. Stop at its review point before you paste
the next prompt.

Optional: start Claude Code with `claude --plugin-dir ./course/ai-sdlc-mod`
and run `/sdlc` to view this route inside Claude Code. The prompt button fills
the input but does not submit it.

## A1. Check the setup

Paste this prompt into Claude Code.

```text
We are on workshop/start. Read README.md, WORKSHOP.md, CLAUDE.md and package.json first. Check Node and my current diff. Install the dependencies and generate the sample fixtures. Run the main tests and the workshop tests. Explain why the workshop failures are expected; do not solve them yet. Reuse my existing console or start one on port 4320 if free. Show its health and the local URL. Do not push or change hooks. Stop for my setup review.
```

Open `http://localhost:4320` yourself. The main tests must pass. The A3, A4,
A5, and A8 workshop tests must fail on their exercise TODOs. Run
`npm run workshop:check` and name the first TODO that you will build.

Stop when the console opens and you can explain each expected workshop failure.

## A2. Write the intent

Paste this prompt into Claude Code.

```text
Read intent.md, fixtures/incidents/bad-deploy.json (INC-1001) and REVIEW.md. Interview me one question at a time about who the SRE agent serves. Help me write three checks a stranger can repeat. Keep the boundary: sample data, read-only investigation, named humans approve and close. Ask before editing intent.md. Stop after one interview round and show the diff for my review. Do not build or push.
```

Reject a check that describes a wish instead of an observable result. Accept
`intent.md` yourself before you continue.

Stop when the outcome, three checks, owners, boundary, and an `OPEN` item are
specific enough for another person to review.

## A3. Build the verdict contract

Paste this prompt into Claude Code.

```text
Read our accepted intent.md and docs/spec.md. Propose the verdict contract, then wait for my acceptance. After acceptance, show the red A3 tests in test/workshop/contract.test.ts. Implement TODO(A3) in src/contract.ts. Add required non-empty customer_impact to src/runtime.ts and the fixtures in test/contract.test.ts too. Preserve the evidence and draft_only rules. Run the A3 tests, main suite, typecheck and offline bad-deploy investigation. Show the diff and actual outputs. Do not weaken tests or copy solved tags. Stop for my review.
```

Check every changed verdict consumer that the tests or type checker identify.
Do not accept a contract that allows empty `customer_impact`, uncited claims, or
an action without human approval.

Stop when the A3 tests, the main suite, typecheck, and the offline investigation
all pass with the new field.

## A4. Rebuild the controls

Paste this prompt into Claude Code.

```text
Read intent.md, test/workshop/chat.test.ts and test/workshop/guard.test.ts. Use chat.test.ts for the chat contract; guard.test.ts checks the separate human hook edit. Implement only TODO(A4) in src/chat.ts so chat refuses rollback, scale, flag, approve and resolve requests and points to human controls. Ask me to choose one extra mutation phrase, then add its test. Run the relevant tests and show the diff. Do not edit .claude/, approvals/, PROGRESS.md or bench/ratchet.json. The human will add the hook rule. Do not approve or execute anything. Stop for my review.
```

You must edit `.claude/hooks/guard.mjs` by hand. Add the rule that denies agent
edits to `bench/ratchet.json`. Claude Code must not make this edit. Ask Claude
Code to run the A4 and hook tests after your change. Read the matching denial
in `approvals/audit.jsonl` yourself.

Stop when your extra mutation phrase is refused and the human-written hook rule
produces a recorded denial.

## A5. Build the read-only deploy tool

Paste this prompt into Claude Code.

```text
Read src/tools.ts and test/workshop/tools.test.ts. Show the red A5 tests, then implement TODO(A5): bind the list_deploys handler to the telemetry and register it in createTelemetryServer. Keep every tool read-only. Ask me to choose one empty or missing deploy case, then add its test. Run the A5 tests and an offline bad-deploy investigation. Show both code changes and the list_deploys trace. Do not copy a solved tag or add a mutation tool. Stop for my review.
```

Inspect both changes in `src/tools.ts`. The handler must use telemetry data and
the MCP server must register `list_deploys`. No rollback, scale, approval, or
other write tool may exist.

Stop when your extra case passes and the investigation trace contains the real
deploy record.

## A6. Diagnose a sample incident

Paste this prompt into Claude Code.

```text
Read docs/plan.md and the bad-deploy fixture. Propose a local demo plan using the existing shop, traffic and console scripts, then wait for me to accept it. Reuse running processes; do not stop unrelated ones. After acceptance, run sample traffic and the bad-deploy scenario. Help me match each diagnosis claim to its tool trace and compare one alternative cause. Ask before writing docs/diagnosis-live.md. Mark missing evidence OPEN. Do not approve, execute or resolve. Stop for my review.
```

Choose the alternative cause yourself. When no model is configured, inspect
`ruled_out` and `would_change_my_mind`. Do not describe scripted output as
model evidence.

Stop when every diagnosis claim points to a tool result and unsupported claims
are marked `OPEN` in `docs/diagnosis-live.md`.

## A7. Add an adversarial bench case

Paste this prompt into Claude Code.

```text
Read bench/cases.json and its current results. Propose one adversarial alert case based on our incident, then wait for me to accept it. Add the case without weakening existing cases, expected outcomes or bench/ratchet.json. Run the bench before and after. Show the diff, PASS result and harmful count. If it fails, explain the failure before proposing a fix. Do not alter hooks or the score floor. Stop for a neighbor to rerun the bench.
```

Choose the false instruction inside the alert. Review its expected safe result
before Claude Code adds it. Ask Claude Code to lower `bench/ratchet.json` and
inspect the expected denial. Keep the file unchanged. If you work alone, rerun
the bench in a new session and record that fact.

Stop when the new case passes, `harmful` remains zero, and another run confirms
the result.

## A8. Build the approval gate

Paste this prompt into Claude Code.

```text
Read src/executor.ts and test/workshop/executor.test.ts. Show the red A8 tests, then implement TODO(A8) in checkApproval. Require a named human approval for this incident and this action. Ask me to choose one wrong incident or action. Test that case plus the valid approval. Run the A8 tests and remaining workshop tests. Show the diff and actual results. Never create an approval, click Approve or Execute, push, or change hooks. Stop for my review; I operate the console myself.
```

Choose the mismatched incident or action yourself. Inspect the diff and confirm
that pending, anonymous, mismatched, and cross-incident approvals fail.

After the code review, operate the local console yourself. Enter your name,
approve the sample rollback, click **Execute**, and watch for **LANDED**. Mark
the sample incident mitigated yourself. Claude Code must not perform these
steps.

Stop when all workshop tests pass and your named approval gates only the exact
sample action.

## A9. Keep the reviewed lesson

Resolve the sample incident yourself in the console. Write concrete resolution
notes and inspect the entry in `lessons/lessons.md`.

Paste this prompt into Claude Code.

```text
Read our incident evidence and lessons/proposed/. Suggest one lesson with the incident id, date and evidence refs. Do not resolve the incident or edit lessons/lessons.md; I do that in the console. Interview me about my hackathon idea and draft docs/hackathon-intent.md with three checks and open questions. Ask before editing. Then use /handoff to record verified work, OPEN items and the next step. Do not rewrite PROGRESS.md or push. Stop for my review.
```

Review the proposed lesson yourself. Keep only claims that the incident evidence
supports. Check that `docs/hackathon-intent.md` and `HANDOFF.md` preserve every
unfinished item as `OPEN`.

Stop when the human-authored incident lesson has provenance and the next agent
can continue from the handoff without guessing.

## Explore the completed runtime after the build

Open `course/index.html` for the deeper explanation of the investigation loop,
the verdict contract, the approval record, and the lessons flow. Use fixtures
and `npm run investigate -- <fixture> --dry-run` to explore behavior. These
runs supplement the nine assignments. They do not replace the red-to-green
build evidence above.
