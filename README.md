# SRE on-call lab: Day 5 AI-native SDLC

This `main` branch is the completed-runtime checkpoint course. The six required
assignments below run on `workshop/start`, which contains the red A3, A4, A5,
and A8 cuts. Use `CARD.md` and `WORKSHOP.md` for the solved runtime route.

In this lab you build an AI first responder for a small checkout service, with
Claude Code as your builder. An alert fires. The agent reads the telemetry,
the deploy history and the logs. It posts one diagnosis with a reference
behind every claim, and it proposes ONE next step. A named human decides.
After the human acts, the agent watches the metric and reports if the fix
landed.

The agent **cannot** roll back, scale, flip a flag or page anyone. That is the
design: the agent gathers evidence, proposes, verifies and communicates;
humans decide what to mitigate and when.

Everything runs on your own machine. All data is fictional.

![The on-call loop: alert → investigation → recovery](docs/diagrams/01-architecture.svg)

## The scenario

| Part | Command | Where |
| --- | --- | --- |
| **Checkout shop** — a mock checkout service that writes its own telemetry | `npm run shop` | `http://localhost:4310` |
| **Traffic** — steady checkouts against the shop | `npm run traffic` | — |
| **Chaos** — your lever to break the shop: a bad deploy, slow latency or errors | `npm run chaos -- deploy v2.15.0 --mode bad-deploy` | modes: `healthy`, `bad-deploy`, `slow`, `errors` |
| **Console** — the on-call desk: incidents, chat with the agent, approve/execute/resolve buttons, and a JSON API | `npm run console` | `http://localhost:4320` (health: `/api/health`) |

The reference incident is **INC-1001** (`fixtures/incidents/bad-deploy.json`):
the checkout error rate jumps after a deploy. The tutorial, the tests and the
bench replay it from fixtures. When you break the live shop, the console's
listener opens a new incident with its own id (`INC-<number>`). The listener
uses fixed criteria (error rate above 2% or p95 above 2000 ms, sustained for
about 5 minutes; set `AGENT_LISTEN_WINDOW_MIN=1` for a faster demo). The agent
is never the detector.

## Participant start

You need:

- **Node.js 22 or newer** (check with `node --version`) and npm.
- **Claude Code**, signed in with your own account
  (`claude --setting-sources project --strict-mcp-config --no-chrome`, then `/login`).
  Claude Code is your builder.
- **No API key.** The agent runs offline by default: a scripted investigator
  drives the same tools against the same data. Its output demonstrates the
  pipeline; it is not model evidence.

```sh
node --version
git clone --branch workshop/start https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
claude --setting-sources project --strict-mcp-config --no-chrome
```

Run `node --version` before cloning. Continue only on v22 or newer. Stop on
v21.6 and use the approved Node 22 setup for this laptop.

Run every shown POSIX command in Terminal 2. On Windows, use Git Bash. The
GitHub Actions smoke checks Node 22, `npm ci`, typecheck, and hooks under Git
Bash on GitHub-hosted Windows. A
Worldline-managed laptop and proxy still need a real participant dry run.

This command checks out the exercise branch directly. The current `main` branch
contains a separate completed-runtime course.

Review the current path and confirm it is your own clone. The final command
starts Claude Code at the repository root.
This workshop command loads project context without user or global settings.
The repository disables Claude Code auto memory for this bounded lesson.
The separate SRE product runtime ignores builder settings and exposes only its
explicit telemetry tools.
Accept Claude Code's folder-trust prompt only when the
displayed path is your own trusted clone. Never bypass trust for an unfamiliar
folder. Restart the same command if project skills remain missing after trust.

Cursor is optional. If it opens **Agents**, choose **IDE** and use its terminal.
The lesson only needs a terminal and browser.

## Shared terms

- An **incident** is a detected service problem with an id, state, and evidence.
- A **fixture** is fictional test data that makes one case repeatable.
- A **proposal** is the agent's suggested next step. It is not an action.
- An **approval** is a named human decision for one exact incident and proposal.

`INC-1001` is the fixture incident. The A6 listener creates a different live
incident id.

Open [SOLO.md](SOLO.md#a1-map-the-repo-and-prove-setup). Start A1 with the
explicit `/show-me` prompt. It creates a read-only text map of the fixture,
runtime, trace, and console path. The second A1 prompt runs setup checks. The
main suite must pass. Only the A3, A4, A5, and A8 workshop tests must fail on
their exercise TODOs. `npm run workshop:check` locates unfinished markers. It
is not a completion gate.

Facilitators use [`FACILITATOR.md`](FACILITATOR.md) for the schedule, expected
starter failures and the manual fallback.

For a visual route through the AI-native SDLC, start Claude Code with
`claude --plugin-dir ./course/ai-sdlc-mod` and run `/sdlc`. The optional mod
reads the first prompt from each assignment section in `SOLO.md`. A7 and A9
remain optional. The mod leaves every human gate intact. Use the remaining copy
prompts from `SOLO.md` or the slides.

## Run it

Use four separate terminals. Keep the console, shop, and traffic running.
Run the chaos command once in the fourth terminal.

| Terminal | Command |
| --- | --- |
| 1 | `AGENT_LISTEN_WINDOW_MIN=1 npm run console` |
| 2 | `npm run shop` |
| 3 | `npm run traffic` |
| 4 | `npm run chaos -- deploy v2.15.0 --mode bad-deploy` |

The one-minute listener setting belongs on the console process. Production
uses the default five-minute window. Stop only processes that you started.

Other useful commands:

```bash
npm run demo                 # the whole loop on a bad deploy, about 2 minutes
npm run doctor               # preflight check
npm run progress             # which assignments have local signals; validation stays OPEN
npm run workshop:check       # locate unfinished markers; not a completion gate
npm run investigate -- fixtures/incidents/bad-deploy.json --dry-run   # INC-1001 from fixtures
```

## The file flow

Each step of the AI SDLC leaves one file behind. Write them in this order:

1. **`intent.md`** — who the agent serves, the boundary, and three checks a
   stranger can verify.
2. **`docs/spec.md`** — the contract the code must meet.
3. **`docs/plan.md`** — the steps, smallest first, and the checks.
4. **`PROGRESS.md`** — the build log: append-only. The progress hook appends
   an entry when it sees a local signal for an assignment. Validation stays
   OPEN until the actual checks are reviewed separately. You add your own lines
   at the bottom. Nobody rewrites old lines.
5. **`REVIEW.md`** — the review checklist you run before you share a change.

## The assignment

Build the agent piece by piece, test first: **Intent → Spec → Design/controls
→ Build → Test/evals → Gate → Maintain.** The `workshop/start` branch has
four pieces removed (`TODO(A3/A4/A5/A8)`); the red tests in `test/workshop/`
turn green as you rebuild them.

| # | Assignment |
| --- | --- |
| A1 | Map the repo and prove setup |
| A2 | Write a reviewed `intent.md` with three repeatable checks |
| A3 | Accept, build, and verify the `customer_impact` verdict contract; `/verify-this` returns `VERIFIED`, `NOT VERIFIED`, or `INCONCLUSIVE` |
| A4 | Build chat refusal; add the protected-file hook rule by hand |
| A5 | Build `list_deploys` and remove the starter bypasses |
| A6 | Run the live counterpart, challenge its evidence, and prove the existing A8 human-approval gate |

A7 is an optional deterministic fixture evaluation. A9 is an optional lesson.
The hackathon handoff is a recap, not a seventh required assignment.

The classroom goals and checks are in **[WORKSHOP.md](WORKSHOP.md)**. The exact
Claude Code prompts, learner choices, and stop points are in
**[SOLO.md](SOLO.md)**. Use the same SOLO prompts in a team or alone.

## The rules

- **Local only.** Everything runs on your machine. The agent has no network
  access: the guard hook denies network calls.
- **Push nothing.** Commit locally if you like, but do not push branches, open
  pull requests or deploy anything. The guard hook denies `git push`.
- **Humans decide.** The agent proposes; a named human approves, executes and
  closes. The agent may not sign approvals, edit hooks, edit `.claude/`, or
  rewrite `PROGRESS.md`.
- **No secrets in files.** You do not need an API key for this lab.

## Optional appendices

The required route stays scripted and offline. The optional live product model
uses the Claude Agent SDK after the six required assignments. Use Git Bash on
Windows for `AGENT_MODEL=...` and `env -u ...` commands. Treat authentication,
usage, and cost as separate human approvals. A configured model name is not
evidence of a completed model run.

The public skills pack is also appendix material. The repository already
contains every project skill needed for the six required assignments.

### Choose one skill for the hackathon

The SRE repository already contains every project skill used in A1 through A6. Finish
the core route and its reviewed handoff before you add anything. Then open the
public [Claude Code skills pack](https://github.com/AetherLink-bv/claude-code-skills-pack)
for selective hackathon reuse.

Clone the pack into a separate folder. Start Claude Code there:

```sh
git clone https://github.com/AetherLink-bv/claude-code-skills-pack.git
cd claude-code-skills-pack
claude --setting-sources project --strict-mcp-config --no-chrome
```

Choose one skill. Ask Claude to propose a project-local install:

```text
Read README.md and inspect the skill I choose. Explain what it does and its requirements. Propose installing only that skill in my chosen project's .claude/skills folder. Check for an existing skill with that name and preserve it. Show the source and target paths. Ask for my approval before copying or replacing anything. Do not install the full pack, change global settings, or run the skill yet.
```
