# Workshop 5 — build the AI SRE agent (AI-native SDLC)

The team path through this repo. You build the agent piece by piece, test
first, with Claude Code as the builder — and you learn the AI SDLC loop on the
way: **Intent → Spec → Design/controls → Build → Test/evals → Gate →
Maintain.**

Everything runs offline. No API key needed: the scripted runtime
(`src/runtime.ts`) drives the same tools as a real model. A real model is
optional (`AGENT_MODEL=<name>`).

## Setup

```sh
git clone --branch workshop/start --single-branch https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
claude
```

`workshop/start` has four pieces removed (the TODO(A3/A4/A5/A8) markers —
`npm run workshop:check` lists them). `npm test` stays green; the red tests
live in `test/workshop/`. `npm run progress` shows which assignments have local
signals. Validation stays OPEN until the actual checks are reviewed separately.

Open [the A1 prompt](SOLO.md#a1-check-the-setup) in Claude Code. It installs
the dependencies, generates the fixtures, runs both test suites and opens the
console. The main suite must pass. Only the A3, A4, A5 and A8 workshop tests
must fail on their exercise TODOs. Stop for the setup review before A2.

Each later prompt names the files, checks, human decision and stopping point.
Build on your own work. Do not copy files from solved branches or tags.

## Two gates — don't confuse them

- **Runtime gate** — a diagnosis needs a NAMED approval before the executor
  may act: `npm run approve -- <incident> --by <name>` or the console buttons.
  Record: `approvals/<inc>.approval.json`.
- **SDLC gate** — in an authorized shared workflow, a `fix/*` branch may only
  be pushed after a named human runs `npm run approve:git`. The agent cannot
  run that command. This local lab does not push or exercise that gate.

| # | Assignment | Build evidence |
|---|---|---|
| A1 | Setup check | Console health, green main suite, expected red workshop tests |
| A2 | Write your team intent.md | Reviewed intent with three repeatable checks |
| A3 | Spec + contract green | A3 tests, main suite, typecheck, offline investigation |
| A4 | Wire and prove the controls | Chat refusal plus a human-written hook denial |
| A5 | Build a read-only tool | A5 tests plus real `list_deploys` trace data |
| A6 | Diagnose a sample incident | Cited diagnosis and one alternative cause |
| A7 | Pass the bench. Add a case. | Before-and-after bench with `harmful` at zero |
| A8 | The gate: approve with your name | Negative approval tests plus human console action |
| A9 | Maintain + your hackathon intent.md | Human lesson, reviewed intent, and handoff |

## A1 — Setup check

**Goal:** everything installed, the console up, Claude Code connected.

Use the A1 setup prompt that you pasted during setup.

- `npm ci && npm run fixtures`
- `npm test` → all green; `npm run test:workshop` → red on the A3/A4/A5/A8 tests
- `npm run console` → open `http://localhost:4320`, then `curl localhost:4320/api/health`
- `claude` in this directory → `/status` shows the guard + progress hooks

## A2 — Write your team intent.md

**Goal:** one page a stranger could hold you to. Fill `intent.md`: who the
agent serves, the boundary (read-only; propose, never mutate; humans close),
and **three checks a stranger can verify** (e.g. "chat refuses 'roll back
now'", "a verdict without evidence refs is rejected"). The
`design-control-loop` skill can interview you onto the page.

Paste the [A2 intent prompt](SOLO.md#a2-write-the-intent) into Claude Code.

## A3 — Spec + contract green

**Goal:** rebuild the evidence rules **and** add the `customer_impact` field,
test-first. `test/workshop/contract.test.ts` is red now. Write down the
contract in `docs/spec.md`, then make it pass in `src/contract.ts`
(`TODO(A3)`). `customer_impact` is required, so add it to the offline
verdicts in `src/runtime.ts` and the verdict fixtures in
`test/contract.test.ts` too. With only `src/contract.ts` changed, `npm test`
shows 5 failures and the dry run prints `FAIL contract`. The console must
still render a diagnosis — run one in
`npm run investigate -- fixtures/incidents/bad-deploy.json --dry-run`.

Paste the [A3 contract prompt](SOLO.md#a3-build-the-verdict-contract) into
Claude Code. Accept the proposed contract before Claude Code edits code.

## A4 — Wire and prove the controls

**Goal:** chat refuses mutations again (`src/chat.ts`, `TODO(A4)`), and the
guard hook enforces your own rule. `.claude/hooks/guard.mjs` already denies
network, secrets, self-approval and unapproved pushes. **You** add one rule
(by hand — the agent may not edit hooks): deny agent edits to
`bench/ratchet.json`. Prove it: `test/workshop/guard.test.ts` turns green and
`approvals/audit.jsonl` shows a deny. Write the decision down in
`docs/decisions/D01-*.md`.

Paste the [A4 controls prompt](SOLO.md#a4-rebuild-the-controls) into Claude
Code. You edit `.claude/hooks/guard.mjs` by hand. Claude Code may only run the
checks after your edit.

## A5 — Build a read-only tool

**Goal:** `list_deploys` works end to end. Implement the handler binding and
register the tool in `src/tools.ts` (`TODO(A5)`) until
`test/workshop/tools.test.ts` is green. Proof in the console: run an
investigation and see `list_deploys` in the trace.

Paste the [A5 tool prompt](SOLO.md#a5-build-the-read-only-deploy-tool) into
Claude Code. Choose the empty or missing deploy case yourself.

## A6 — Diagnose a live incident

**Goal:** the full loop on live telemetry.

Paste the [A6 diagnosis prompt](SOLO.md#a6-diagnose-a-sample-incident) into
Claude Code. Accept the local plan before Claude Code starts the scenario.

- Terminal 1: `npm run shop` (the checkout service, `localhost:4310`)
- Terminal 2: `npm run traffic`, then `npm run chaos -- deploy v2.15.0 --mode bad-deploy`
- The console raises the incident (deterministic listener) after the error
  rate stays above 2% for about 5 minutes (`AGENT_LISTEN_WINDOW_MIN=1` for a
  faster demo). Open it: read the diagnosis and match every evidence ref to
  the trace line of the tool that produced it.
- In chat, challenge it: *"Could this be something other than the deployment?"*
- Save the diagnosis to `docs/diagnosis-live.md` (template header there).

## A7 — Pass the bench. Add a case.

**Goal:** the bench is the regression gate.

Paste the [A7 bench prompt](SOLO.md#a7-add-an-adversarial-bench-case) into
Claude Code. Choose and accept the false instruction yourself.

- `npm run bench` → `PASS bench (5/5)` (or better)
- Add one case to `bench/cases.json` (new incident shape or an adversarial
  alert). `npm run bench` again.
- Ask the agent to lower `bench/ratchet.json` `min_rate` → your guard rule
  from A4 denies the edit. By hand, a lower floor still passes the bench (it
  only checks the score against the floor), so review is the second guard:
  reject any PR that lowers `ratchet.json`. The floor only goes up.

## A8 — The gate: approve with your name

**Goal:** the executor verifies a signed approval before it acts. Rebuild
`checkApproval` in `src/executor.ts` (`TODO(A8)`) until
`test/workshop/executor.test.ts` is green. Then in the console: Approve with
your name → Execute → watch the three verified checkouts → **LANDED** → mark
mitigated. And confirm chat still refuses *"roll back now"* — a button, not a
sentence.

Paste the [A8 gate prompt](SOLO.md#a8-build-the-approval-gate) into Claude
Code. Claude Code builds and tests `checkApproval`. You operate **Approve**,
**Execute**, and **Mark mitigated** in the local console.

The git gate is reference material only. Do not push this local lab or run
`npm run approve:git`. In an authorized shared workflow, a named human runs
that command in their own terminal. The agent never approves itself.

## A9 — Maintain + your hackathon intent.md

**Goal:** close the loop. Resolve the incident in the console with real notes
→ they land in `lessons/lessons.md` with provenance. Review
`lessons/proposed/` (agent-written, unreviewed). Then write
`docs/hackathon-intent.md`: the intent.md for the agent you build next.
Hand the day off to the next agent or teammate with the `/handoff` skill —
it writes a clipboard-ready `HANDOFF.md`.

Resolve the sample incident yourself. Then paste the
[A9 maintenance prompt](SOLO.md#a9-keep-the-reviewed-lesson) into Claude Code.
