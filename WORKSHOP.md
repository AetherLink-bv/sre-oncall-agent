# Workshop 5: build the AI SRE first responder

You are new to this codebase. Checkout errors rose after deploy `d-4821`.
Build a local first responder that gathers evidence, explains customer impact,
refuses operational action, and stops at a named human gate.

Claude Code is the builder. The on-call agent is the product. The core product
runs offline against scripted fictional evidence. A real model investigator is
optional and separate.

The shop, traffic generator, console, fixtures, and tests already exist. You
build the missing logic, evidence path, controls, and handoff. Do not rebuild
the supplied product scaffolding.

| The starter supplies | You build and prove |
| --- | --- |
| Local console, checkout shop, traffic, chaos, and fictional fixtures | A3 verdict contract and customer impact |
| Node 22, TypeScript, tsx, Zod, tests, and read-only tool infrastructure | A4 refusal and hook rule, A5 deploy tool path, A8 approval match |
| Existing runtime and UI surfaces | Intent, cited diagnosis, offline fixture coverage, human boundaries, and handoff |

This scope saves tokens and waiting time. Do not ask Claude Code to regenerate
the supplied app.

## Start in a terminal

1. Clone `workshop/start`.
2. Review the path and confirm it is your own clone.
3. Run `claude` at the repository root.
4. Accept folder trust only for that clone. Never bypass trust for an
   unfamiliar folder.
5. Restart `claude` if project skills remain missing after trust.
6. Open [SOLO.md](SOLO.md) and use the A1 prompt.

Cursor is optional. If it opens **Agents**, choose **IDE** and use its terminal.

The repository already contains the project skills. The optional `/sdlc` mod
shows the first prompt from each A1–A9 assignment. It does not submit a prompt
or perform a human action.

## Use one loop for all nine assignments

1. Learn the current shape.
2. Choose one outcome or example.
3. Build one small step.
4. Inspect the diff and focused proof.
5. Keep unsupported claims and human decisions `OPEN`.

If Claude shows no visible progress for two minutes, ask it to state the
blocker and next focused check. Do not rerun the full suite after every prompt.

## Build route

| Assignment | What you build | Your choice | Proof |
| --- | --- | --- | --- |
| A1 | Shallow repo map and setup evidence | Which expected red assignment to inspect first | Main suite green; only A3, A4, A5, and A8 red |
| A2 | Reviewed `intent.md` | Operator and three repeatable checks | Reviewed diff with a read-only boundary |
| A3 | Customer-impact verdict contract | One invalid verdict | Accepted contract, focused red, small patch, focused green, `/verify-this`: `VERIFIED`, `NOT VERIFIED`, or `INCONCLUSIVE` |
| A4 | Chat refusal and one human-owned hook rule | One mutation phrase | Chat test, named human edit, focused guard denial |
| A5 | Read-only `list_deploys` tool | Empty window or missing deploy | Tool result and exact trace arguments |
| A6 | Cited sample incident diagnosis | One alternative cause | Stable `source:ref` labels, snapshot wording, mutation refusal |
| A7 | Deterministic offline fixture coverage | One incident variation | Before and after bench, `harmful` 0, unchanged floor |
| A8 | Exact approval gate | Wrong incident or wrong action | Negative test stays blocked; no human action fabricated |
| A9 | Lesson proposal, hackathon intent, and approved handoff | One lesson claim and hackathon problem | Partner can resume from `HANDOFF.md` |

## Terms at the moment you need them

- A **contract** is a result shape that a test can reject. You use it in A3.
- A **trace** records the ordered tool calls and arguments behind a claim. You
  inspect it in A5 and A6.
- An **incident** is a detected service problem with an id, state, and evidence.
- A **deploy** is a recorded software release such as `d-4821`.
- A **bench** is a repeatable offline score over deterministic fixture cases.
  It does not prove live model behavior.
- A **gate** blocks an action until the exact human decision exists.

## Human boundaries

- A human accepts `intent.md` and the verdict contract.
- A human edits `.claude/hooks/guard.mjs` in A4. Replace the four-line
  `TODO(A4)` comment block immediately before
  `else if (SDLC_ARTEFACT.test(rel))` with
  `else if (rel === "bench/ratchet.json") decide("deny", "guard: ratchet is human-owned");`.
  This rule does not claim full shell protection.
- A human starts the A6 console, shop, continuous traffic, and one-shot chaos
  command in four separate terminals. Set `AGENT_LISTEN_WINDOW_MIN=1` on the
  console command for class. Production keeps five minutes.
- A human may approve, execute, or resolve in the local console. Those actions
  stay `HUMAN OPEN` unless a named participant performs them.
- A human promotes a proposed lesson into `lessons/lessons.md`.
- A human reviews the `/handoff` text before a separate approved write saves
  the exact text to `HANDOFF.md`.

Do not push, deploy, or run the git approval flow in this local lab.

## Evidence boundaries

- The scripted investigator proves the offline fixture pipeline. It is not
  live model evidence.
- `npm run workshop:check` locates unfinished markers. It is not a completion
  gate.
- `PROGRESS.md` records local signals. It does not prove validation.
- `approvals/audit.jsonl` records actions and decisions. It is not memory.
- `lessons/lessons.md` is curated operational knowledge. A human reviews it.
- The A7 offline bench proves deterministic policy coverage only. A live model
  eval is optional and outside the core route.

## From A9 to the hackathon

Day 4 separated curated `memory.md` from session context and technical logs.
Day 5 keeps the same distinction with lessons, audit records, progress signals,
and the handoff.

Use `docs/hackathon-intent.md` to name one customer or operator problem, three
repeatable checks, boundaries, and `OPEN` questions. Use `HANDOFF.md` to give
the next teammate verified work, every human-owned item, and one next step.

The Daily Brief agent is a bonus after A1 through A9. Do not shorten the SRE
route to fit the bonus.
