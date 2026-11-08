# Facilitator run sheet — Workshop 5 (one day, starts 10:00)

The day: nine assignments A1–A9 on `workshop/start`. Keep participants on
that branch and use the matching prompt in `SOLO.md` first. Each participant
builds, inspects the actual output, and stops for the human review.
Solved tags `w5-step-0-setup` … `w5-step-8-maintain` are comparison material
after an attempt. Preserve local work and inspect `git diff <tag> -- <files>`.
Apply only a reviewed change; do not copy the solved files over an exercise.
Assignment titles below match the slide deck.

## Time boxes

| time | block | expected output at a glance |
|---|---|---|
| 10:00–10:50 | intro: AI-native SDLC loop + repo tour | participants can name the 7 phases |
| 10:50–11:00 | A1 Setup check | `npm test` green; `npm run test:workshop` red; console on :4320 |
| 11:00–11:15 | break | — |
| 11:28–11:43 | A2 Write your team intent.md | `intent.md` filled — boundary + 3 verifiable checks |
| 11:47–12:00 | A3 Spec + contract green (finish after lunch) | accepted verdict contract; A3 tests going red→green; main suite, typecheck and offline investigation pass |
| 12:00–13:00 | lunch | — |
| 13:30–13:50 | A4 Wire and prove the controls | chat refuses "roll back now"; audit.jsonl has denies; `guard.test.ts` green |
| 13:50–14:05 | A5 Build a read-only tool | `list_deploys` in the console investigation trace |
| 14:10–14:40 | A6 Diagnose a live incident | `docs/diagnosis-live.md`; a challenged chat answer with refs |
| 14:40–14:55 | break | — |
| 15:04–15:15 | A7 Pass the bench. Add a case. | `PASS bench`; a new case in cases.json; agent edit of ratchet.json denied |
| 15:23–15:30 | A8 The gate: approve with your name | LANDED in console; `executor.test.ts` green |
| 15:42–15:50 | A9 Maintain + your hackathon intent.md | new lessons.md entry; hackathon intent; `/handoff` → HANDOFF.md |

The gaps between boxes (11:15–11:28, 11:43–11:47, 13:00–13:30, 14:05–14:10,
14:55–15:04, 15:15–15:23, 15:30–15:42) are the deck's talk/demo segments.

A8 builds and tests the runtime gate. The participant operates the sample
console personally. The git gate is reference material for a separately
authorized shared workflow. Do not push or run `npm run approve:git` in this
local classroom lab. Claude Code never approves, executes, or resolves.

## Top failure + fix per block

- **A1** — tests red in `npm test`: inspect the exact failure, current branch,
  and local diff first. Preserve participant work before correcting a wrong
  branch manually. On `workshop/start`, the main suite should pass; only
  `test/workshop/` starts red. Resume the A1 setup prompt after correction.
- **A2** — intent reads like a wish list: demand the three *verifiable* checks, each runnable by a stranger.
- **A3** — `npm test` shows 5 failures or the dry run prints `FAIL contract`: `customer_impact` is in `src/contract.ts` but not yet in the offline verdicts in `src/runtime.ts` or the fixtures in `test/contract.test.ts`.
- **A3** — "green" but the console broke: they dropped a required field. The console renders the same schema; `npm run typecheck` catches it first.
- **A4** — participant tries to make the agent edit the hook: that IS the lesson (denied by design; hooks are human-edited). If `approvals/audit.jsonl` is missing: the hook only logs on tool calls — run one.
- **A5** — tool returns `[]`: they bound the handler but did not register `tool("list_deploys", ...)`; or registered but the handler is the stub. Both halves are in `src/tools.ts`.
- **A6** — no incident appears: traffic isn't running. `npm run traffic` must be up before chaos; the listener opens an incident only after the error rate stays above 2% for ~5 minutes (start the console with `AGENT_LISTEN_WINDOW_MIN=1` for a faster demo). Check `curl localhost:4320/api/incidents`.
- **A7** — lowered ratchet "worked": expected. By hand, a lower `min_rate` still passes, because the bench only checks the score against the floor. The floor is protected by the A4 guard rule (the agent is denied) and by review (reject a PR that lowers `ratchet.json`).
- **A8** — execute button stays disabled: approval pending or name empty; a name is required and it must match *this* incident + `rollback`.
- **A9** — lessons entry without provenance: notes must include incident id, date and the human's name (the console does this — free-form edits do not count). `/handoff` writes `HANDOFF.md` — check it exists.

## Reuse or restart your own shop/console

Reuse the existing shop and console when they belong to this lab. Check ports
4310 and 4320 before starting anything; do not start a second server on an
occupied port.

If a restart is necessary, stop only your own shop and console with Ctrl+C in
the terminals where you started them. Preserve participant work, runtime
state, evidence, and approval records. Do not delete them as part of setup.

For a fresh facilitator demo, use a separate demo working directory. Keep the
participant's directory intact. Start the shop and console there only after
their ports are free. Do not silently discard runtime data or stop another
person's process.

## No-Claude dry run (agent unavailable)

The whole day works without Claude Code — every exercise is plain TypeScript +
`node:test`:

- A3/A4/A5/A8: do the TODO by hand; `npm run test:workshop` still grades it.
- The guard hook still works (it's a `node` process) — test it directly:
  `echo '{"tool_name":"Edit","tool_input":{"file_path":"…/bench/ratchet.json"}}' | node .claude/hooks/guard.mjs`
- Claude-specific bits that degrade gracefully: skills don't load
  (read `.claude/skills/incident-triage/SKILL.md` aloud instead), hooks don't
  fire (feed them stdin as above). Keep the git gate as reference material;
  this fallback does not push or run `npm run approve:git`.
