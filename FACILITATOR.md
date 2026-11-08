# Facilitate Workshop 5 from one failure story

The slides lead. `SOLO.md` contains the matching copy-ready prompts. Keep one
failure story across two intake records: fixture INC-1001 is the reference and
A6 creates a new live incident id. Do not introduce a solved branch between
steps.

Claude Code is the builder. The on-call agent is the product. The core product
uses scripted fictional evidence. Never call scripted output live model proof.

Before A1, state the scope. The starter supplies the console, shop, traffic,
chaos, fixtures, tests, TypeScript runtime, Zod contracts, and read-only tool
infrastructure. Participants build the missing A3, A4, A5, and A8 behavior and
produce the evidence route. Do not spend class time regenerating the app.

## Prepare the room

1. Use a clean `workshop/start` clone for each participant.
2. Open any terminal at the repository root. Cursor is optional.
3. Run `claude --setting-sources project --strict-mcp-config --no-chrome` and review the
   displayed folder path. This loads project context without user or global
   settings. The repository disables auto memory for the lesson. The SRE
   product runtime ignores builder settings and uses only its explicit tools.
4. Accept trust only for the participant's own clone. Never bypass trust.
5. Restart the same command if project skills remain missing after trust.
6. Explain that Claude Code is the builder. The product's optional Agent SDK
   runtime is a separate connection.
7. Keep the required route scripted and offline. Offer the live-model route
   only after A5 and only with approved usage, cost, and local authentication.
8. Reuse an existing console only when it belongs to this lab and its listener
   window is known. Do not start duplicates.
9. Keep the full skills pack and `/sdlc` mod optional.

For the optional route, participants authenticate Claude Code on their own
machine. Never accept copied credentials or move authentication to a remote
host. First require one bounded fixture run with `--max-turns 8` and
`--max-budget-usd 0.30`. Review its completed diagnosis and tool trace. Only
then may they restart their own console with
`AGENT_MODEL=sonnet AGENT_LISTEN_WINDOW_MIN=1 npm run console`. The console has
no global model-budget guard. A health label is readiness evidence, not model
evidence. Allow at most one approved investigation, then stop to control usage.
Restart with `env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console`
when authentication, limits, cost approval, or the run fails.

## Time boxes

| Time | Block | Visible checkpoint |
| --- | --- | --- |
| 10:00–10:18 | Incident, outcome, terminal, project skills | Participants distinguish Claude Code from the product |
| 10:18–10:37 | A1 | Shallow map, healthy console, green main suite, expected red workshop tests |
| 10:37–10:55 | A2 | Reviewed intent with three repeatable checks |
| 10:55–11:10 | Break | Help only with the current checkpoint |
| 11:10–11:50 | A3 | Accepted contract, focused red, small patch, focused green, verification verdict |
| 11:50–12:00 | Proof checkpoint | A partner follows the A3 evidence |
| 12:00–13:00 | Lunch | Preserve participant work |
| 13:00–13:30 | A4 | Chat refusal, named human hook edit, focused guard denial |
| 13:30–13:55 | A5 | Read-only tool result and exact trace arguments |
| 13:55–14:35 | A6 | Cited sample diagnosis, snapshot wording, chat refusal |
| 14:35–14:50 | Break | Keep owned processes running only when needed |
| 14:50–15:10 | A7 | Offline before and after bench, harmful 0, unchanged floor |
| 15:10–15:30 | A8 | Negative gate test; real human action remains OPEN |
| 15:30–15:55 | A9 | Lesson proposal, hackathon intent, reviewed and saved handoff |
| 15:55–16:00 | Close | Each learner names the hackathon first step |

## Use the same note rhythm on every block

1. State why the block exists for the failure story and name the current record.
2. Ask the room to predict the visible result.
3. Play the short illustrative clip when it helps.
4. Pause on the named proof line.
5. Let participants build with the copy prompt.
6. Inspect one participant screen or run a partner check.
7. Stop at the stated human boundary.

The saved clips are illustrative. The participant's own output is the proof.

## Keep waits bounded

- After two minutes without visible progress, ask Claude to state the blocker
  and next focused check.
- Keep setup waits below eight minutes before pairing the participant.
- Keep normal build waits below six minutes before a focused intervention.
- Give the A6 listener 90 seconds with `AGENT_LISTEN_WINDOW_MIN=1` before you
  inspect traffic, console health, and incident state.
- Do not fill waits with unrelated theory or a full-suite rerun.

## Recovery by assignment

- **A1.** Confirm the branch and current diff. `npm run workshop:check` only
  locates unfinished markers. It does not prove completion.
  If port 4320 is free, start the console with
  `AGENT_LISTEN_WINDOW_MIN=1 npm run console`. If an owned console already uses
  the default five-minute window, let the human choose between that wait and a
  restart of only their own console.
- **A2.** Reject wishes such as "the agent is reliable." Ask who observes what
  result.
- **A3.** The accepted change crosses the contract schema, types, offline
  runtime verdicts, and main-test fixtures. Keep those dependent edits in
  scope. Do not weaken the test.
- **A4.** Claude builds the chat refusal. A named human edits
  `.claude/hooks/guard.mjs`. Replace the four-line `TODO(A4)` comment block
  immediately before `else if (SDLC_ARTEFACT.test(rel))` with
  `else if (rel === "bench/ratchet.json") decide("deny", "guard: ratchet is human-owned");`.
  Do not claim full shell protection.
- **A5.** Both the handler and server registration live in `src/tools.ts`.
  There is no `src/mcp-server.ts`.
- **A6.** Use separate terminals. Start the console with
  `AGENT_LISTEN_WINDOW_MIN=1`. Start the shop separately. Keep traffic running
  in another terminal. Keep healthy traffic running for two minutes before the
  one-shot chaos command so the diagnosis can compare a before state with the
  bad-deploy breakpoint. Run the one-shot command in its own terminal.
  The participant performs these process actions. The listener creates an
  incident only after telemetry stays above the threshold for the configured
  window. Do not treat the first traffic request as an incident. Record the
  generated live incident id and keep fixture INC-1001 separate. The scripted
  chat may summarize evidence without comparing causes. Mark that gap `OPEN`
  and compare the alternative with diagnosis `ruled_out` evidence.
- **A7.** The offline bench checks deterministic fixture policy. It does not
  prove live model prompt-injection resistance.
- **A8.** Use the deterministic fixture record to prove the gate contract.
  Keep Approve, Execute, and Resolve `HUMAN OPEN`; A8 does not operate on the
  live A6 record.
- **A9.** `/handoff` prints a portable prompt after the classroom override. It
  does not write `HANDOFF.md`. A separate approved prompt saves the exact
  reviewed text.

## A6 terminal layout

Check ports before starting a process. Reuse only processes that belong to the
same participant lab.

| Terminal | Command role |
| --- | --- |
| 1 | `AGENT_LISTEN_WINDOW_MIN=1 npm run console` |
| 2 | `npm run shop` |
| 3 | `npm run traffic`; keep it healthy for two minutes, then keep it running |
| 4 | After the baseline, run `npm run chaos -- deploy v2.15.0 --mode bad-deploy` once |

Production keeps the default five-minute listener window. Stop only processes
that you started. Use Ctrl+C in their own terminals after validation.

## Human-owned decisions

- The participant accepts `intent.md` and the verdict contract.
- The participant writes the A4 hook rule.
- The participant starts the A6 scenario.
- The participant may choose to approve, execute, or resolve in the local
  console. Do not require those actions for automated completion.
- The participant decides whether to promote a lesson.
- The participant reviews the handoff before Claude saves it.

Never fabricate a name, approval, execution, resolution, or accepted lesson.

After A9, share this text in participant chat:

```text
You finished A1–A9 with the project skills already included in the SRE repository. Keep your reviewed HANDOFF.md as the hackathon start point.

For selective reuse, open the public Claude Code skills pack: https://github.com/AetherLink-bv/claude-code-skills-pack

Clone it into a separate folder after the lesson. Choose one skill, then paste this prompt into Claude Code:

Read README.md and inspect the skill I choose. Explain what it does and its requirements. Propose installing only that skill in my chosen project's .claude/skills folder. Check for an existing skill with that name and preserve it. Show the source and target paths. Ask for my approval before copying or replacing anything. Do not install the full pack, change global settings, or run the skill yet.
```

Claude Code 2.1.319 can warn that a `Write(...)` permission rule never matches
because that release uses the merged `Edit(...)` tool. Do not weaken project
permissions. Keep the repository hook and focused guard test as the A4 proof.

## Optional material

- Use the AI-native SDLC explanation in the slide appendix only when the room
  asks for the model.
- Use `/sdlc` only as a view over the first `SOLO.md` prompt for each assignment.
- Use the real-model eval only with approved model access, cost, and data.
- Use the Daily Brief lab only after A1 through A9 are complete.

## No-Claude fallback

Pair the participant or complete the TypeScript TODO by hand. Run the same
focused tests. Read the project skill files aloud when Claude Code is not
available. Keep every human decision and evidence boundary unchanged.
