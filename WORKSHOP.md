# Day 5: build the AI SRE first responder

Claude Code is the builder. The SRE agent is the product. The required route
uses fictional data and the scripted investigator. It does not prove a live
model run.

## Terms

- An **incident** is a detected service problem with an id, state, and evidence.
- A **fixture** is fictional test data that makes a case repeatable.
- A **proposal** is the agent's suggested next step. It is not an action.
- An **approval** is a named human decision for one exact incident and proposal.

`INC-1001` is the fixture incident. A6 creates a separate live incident id.

## Set up once

Use Terminal 2 for commands. On Windows, use Git Bash for every shown POSIX
command, including `AGENT_MODEL=...`, `env -u ...`, and multiline shell blocks.

```sh
git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
claude --setting-sources project --strict-mcp-config --no-chrome
```

Accept folder trust only for your own clone. Open
`http://localhost:4320` when an assignment says to use the browser.

The GitHub Actions Windows job checks Node 22, `npm ci`, typecheck, and hooks
under Git Bash. It does not prove proxy behavior on a Worldline-managed laptop.
That real participant dry run remains `OPEN`.

## Six required assignments

| Assignment | Build and prove | Visible result |
| --- | --- | --- |
| A1 | Map the fixture and live intake paths. Prove setup. | Main checks pass. Only A3, A4, A5, and A8 are red. |
| A2 | Write a reviewed operator intent. | One outcome, three repeatable checks, and human boundaries. |
| A3 | Build and verify `customer_impact`. | Red-to-green contract proof and a read-only verification verdict. |
| A4 | Refuse mutations in chat. Add one human-owned file guard. | Chat stays read-only and the focused guard test records denial. |
| A5 | Build `list_deploys` and remove bypasses. | Read-only tool output and exact trace arguments. |
| A6 | Run the live counterpart, challenge evidence, and prove the A8 gate. | Stable refs, snapshot/current separation, refusal, and a real approval marked `HUMAN OPEN`. |

Use the exact prompts and five-step checkpoints in [SOLO.md](SOLO.md). The A8
test id remains stable, but its human gate is part of A6. There is no seventh
required assignment.

## Catch up without losing work

Catch-up checkpoints follow A3, A5, and A6. Use the tags `day5-after-a3`,
`day5-after-a5`, and `day5-after-a6`. Before using one, run
`git status --short` and stash dirty and untracked work. Create a separate
`day5-catch-up-*` branch from the tag. Inspect the checkpoint before you restore
selected files. Never overwrite participant work with a blind checkout or
reset. A checkpoint is recovery material. It does not prove that you built the
step.

## Optional route

- A7 adds one deterministic offline fixture case. It proves fixture policy only.
- A9 proposes one reusable lesson. Human promotion stays `OPEN`.
- The hackathon handoff is a recap after the six assignments.
- The live product model and public skills pack are appendices.

## Human boundaries

- A human accepts `intent.md` and the A3 contract.
- A human edits `.claude/hooks/guard.mjs` during A4.
- A human starts and stops the A6 processes.
- Claude Code never approves, executes, resolves, promotes, or pushes.
- A real approval remains `HUMAN OPEN` until a named participant acts.
