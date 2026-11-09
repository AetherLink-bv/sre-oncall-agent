# Day 5: completed-runtime checkpoint course

This `main` branch is the solved runtime. It keeps the three checkpoint tasks
generated from `workshop.json` and `CARD.md`. Do not present it as the red
exercise starter.

The slide-aligned six-assignment lesson lives on `workshop/start`. That route
has the A3, A4, A5, and A8 cuts and uses the exact prompts in `SOLO.md`.
Its A3 scope applies five verdict rules across about nine bounded files.

## Shared terms

- An **incident** is a detected service problem with an id, state, and evidence.
- A **fixture** is fictional test data that makes a case repeatable.
- A **proposal** is the agent's suggested next step. It is not an action.
- An **approval** is a named human decision for one exact incident and proposal.

## Set up once

Run POSIX commands in Terminal 2. On Windows, use Git Bash. The Windows CI job
checks Node 22, `npm ci`, typecheck, and hooks under Git Bash. It is not proof
of a Worldline-managed laptop or proxy. That real dry run remains `OPEN`.

```sh
node --version
git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
claude --setting-sources project --strict-mcp-config --no-chrome
```

Check Node before cloning. Continue only on v22 or newer. Stop on v21.6 and
use the approved Node 22 setup for this laptop.

Follow `CARD.md` for the completed-runtime tasks:

1. Accept the evidence-based intent and the human-owned baseline.
2. Repair and prove the read-only tool path.
3. Repair the gate, review the diff, and record the human release decision.

Use `npm run checkpoint -- <start|core-2|core-3>` to inspect a solved state
without changing the working tree. Keep A1 through A9 runtime check ids stable.

## Optional depth

A7 deterministic evaluation and A9 lesson work are optional. The live product
model and public skills pack are appendices. The hackathon handoff is a recap.

## Catch up without losing work

The participant route has reviewed tags after A3, A5, and A6. Use
`day5-after-a3`, `day5-after-a5`, or `day5-after-a6`. Stash dirty and untracked
work before you create a separate `day5-catch-up-*` branch from a tag. Inspect
the checkpoint before restoring selected files. Never use a blind checkout or
reset.

## Human boundaries

Claude Code may gather evidence and propose changes. A named human accepts the
intent, edits guarded files, approves release decisions, operates incidents,
and promotes lessons. Offline output is not live model evidence.
