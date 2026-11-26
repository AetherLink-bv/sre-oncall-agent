# Facilitate Day 5 from one incident story

The slides lead. `SOLO.md` contains each core prompt exactly once. Claude Code
is the builder. The SRE agent is the product. Fixture `INC-1001` and the A6
listener incident are different records.

## Prepare the room

Use this exact setup in Window 2. On Windows, use Git Bash:

```sh
node --version
git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
claude --setting-sources project --strict-mcp-config --no-chrome
```

1. Check Node before cloning. Stop on v21.6 and use the approved Node 22 setup.
2. Give each participant a clean `workshop/start` clone.
3. Use Window 2 for commands. On Windows, use Git Bash.
4. Start Claude Code with project settings and review folder trust.
5. Keep the required route scripted and offline.
6. Open `http://localhost:4320` only when the current step requires it.

Do not claim a Worldline laptop result. Before class, a named human must still
prove Node 22, `npm ci` behind the proxy, the project hooks, and the Git Bash
commands on a managed laptop. Record that facilitator check as `OPEN` until it
happens. GitHub-hosted Windows CI checks Node 22, `npm ci`, typecheck, and hooks.

## Schedule

| Time | Block | Visible result |
| --- | --- | --- |
| 10:00–10:34 | Opening | Story, roles, glossary and setup are visible. |
| 10:34–10:52 | A1 | Repo map, health, main green and three expected red cuts. |
| 10:57–11:07 | A2 | Reviewed intent with three repeatable checks. |
| 11:09–11:24 | Break | Preserve participant work. |
| 11:40–12:05 | A3 | Five verdict rules, focused red and focused green. |
| 12:08–12:15 | A3B | Main tests, typecheck, CLI and independent verification are checked. |
| 12:15–12:18 | Quiz | The room names the contract and human boundary. |
| 12:18–13:18 | Lunch | Preserve participant work. |
| 13:18–13:28 | Restart | Everyone returns before the afternoon route. |
| 13:33–13:58 | A4 | Mutation refused and human-owned guard proved. |
| 14:09–14:19 | A5A | Shortcuts removed; Sonny sees an empty deploy tool. |
| 14:19–14:26 | A5B | The read-only deploy tool is built and Sonny sees again. |
| 14:35–14:47 | A6A | The live shop breaks and Sonny opens an incident. |
| 14:47–15:02 | A6B | A named human uses the console buttons to approve, execute and resolve. |
| 15:02–15:17 | Close | Each learner names one result and the next step. |

A7, A8 and A9 are optional after the close. The live product model and public
skills pack stay in the appendix.

Each participant follows the core route individually. Online assignments do
not require collaboration.

## Assignment rhythm

Use four or five steps for each required assignment.

1. Show the surface label from `SOLO.md`.
2. Ask the learner to predict the visible result.
3. Paste one exact prompt or run one named command.
4. Inspect the result and diff.
5. Stop at the stated human boundary.

Use these exact surface labels:

- `Type this in: Claude Code`
- `Type this in: Window 2 (Git Bash on Windows)`
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
- A6 approval, execution and resolution happen through the console buttons.
- A8 is an optional extra after A6; its test proves exact matching and does not create an approval.
- Lesson promotion and push remain human actions.

## No-Claude fallback

Guide the participant through the same small TypeScript TODO by hand. Run the
same focused check. Keep all evidence and human boundaries unchanged.
