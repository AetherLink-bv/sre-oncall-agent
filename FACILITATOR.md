# Facilitate Day 5 from one incident story

This guide targets `workshop/start`. The surrounding `main` branch is the
completed-runtime checkpoint course. Do not claim that A3 or A4 is red on main.

The slides lead. `SOLO.md` contains each core prompt exactly once. Claude Code
is the builder. The SRE agent is the product. Fixture `INC-1001` and the A6
listener incident are different records.

## Prepare the room

Use this exact setup in Terminal 2. On Windows, use Git Bash:

```sh
git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
claude --setting-sources project --strict-mcp-config --no-chrome
```

1. Give each participant a clean `workshop/start` clone.
2. Use Terminal 2 for commands. On Windows, use Git Bash.
3. Start Claude Code with project settings and review folder trust.
4. Keep the required route scripted and offline.
5. Open `http://localhost:4320` only when the current step requires it.

Do not claim a Worldline laptop result. Before class, a named human must still
prove Node 22, `npm ci` behind the proxy, the project hooks, and the Git Bash
commands on a managed laptop. Record that facilitator check as `OPEN` until it
happens. GitHub-hosted Windows CI checks Node 22, `npm ci`, typecheck, and hooks.

## Schedule

| Time | Block | Visible result |
| --- | --- | --- |
| 10:00–10:28 | Story, roles, glossary, setup | Builder and product are distinct. Setup route is visible. |
| 10:28–10:50 | A1 | Repo map, health, main green, four expected red cuts. |
| 10:50–11:10 | A2 | Reviewed intent with three repeatable checks. |
| 11:10–11:25 | Break | Preserve current work. |
| 11:25–12:00 | A3 and quiz | Accepted contract, focused red, focused green, verification verdict. |
| 12:00–13:00 | Lunch | Preserve participant work. |
| 13:00–13:10 | Restart and settle | Everyone returns before the recap. |
| 13:10–13:18 | Morning recap and A4 context | The room reconnects the map, intent, contract, and control boundary. |
| 13:18–13:40 | A4 | Mutation refused and human-owned guard proved. |
| 13:40–14:05 | A5 | Read-only deploy tool and exact trace arguments. |
| 14:05–14:16 | A5 catch-up and A6 context | Recovery keeps local work intact. |
| 14:16–15:00 | A6 plus human gate check A8 | Live evidence challenged and real approval remains `HUMAN OPEN`. |
| 15:00–15:15 | Break | Stop only processes the participant owns. |
| 15:15–15:20 | A6 catch-up | Partner can resume without guessing. |
| 15:20–15:50 | Hackathon intent studio | Each learner drafts a bounded starting point. |
| 15:50–16:00 | Six-assignment recap | Each learner names the next hackathon step. |

A7 evaluation and A9 lesson work are optional after the scheduled route. The
live product model and public skills pack stay in the appendix.

## Assignment rhythm

Use four or five steps for each required assignment.

1. Show the surface label from `SOLO.md`.
2. Ask the learner to predict the visible result.
3. Paste one exact prompt or run one named command.
4. Inspect the result and diff.
5. Stop at the stated human boundary.

Use these exact surface labels:

- `Type this in: Claude Code`
- `Type this in: Terminal 2 (Git Bash on Windows)`
- `Open in browser: http://localhost:4320`
- `Human review`

## Catch-up safety

Before a catch-up, run `git status --short` and stash dirty and untracked work.
Use `day5-after-a3`, `day5-after-a5`, or `day5-after-a6` to create a separate
catch-up branch. Inspect the checkpoint before restoring selected files. Never
use a blind checkout or reset. A checkpoint proves only the reference state.

## Human boundaries

- The participant accepts the intent and A3 contract.
- The participant edits `.claude/hooks/guard.mjs` in A4.
- The participant starts and stops the four A6 processes.
- The A8 test proves exact matching. It does not create a real approval.
- Approve, Execute, Resolve, lesson promotion, and push remain human actions.

## No-Claude fallback

Pair the participant or complete the same small TypeScript TODO by hand. Run
the same focused check. Keep all evidence and human boundaries unchanged.
