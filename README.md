# SRE on-call lab — Workshop 5 (AI-native SDLC)

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
- **Claude Code**, signed in with your own account (`claude`, then `/login`).
  Claude Code is your builder.
- **No API key.** The agent runs offline by default: a scripted investigator
  drives the same tools against the same data. Its output demonstrates the
  pipeline; it is not model evidence.

```sh
git clone --branch workshop/start --single-branch https://github.com/AetherLink-bv/sre-oncall-agent.git
cd sre-oncall-agent
```

This command checks out the exercise branch directly. The current `main` branch
contains a separate completed-runtime course.

Review the current path and confirm it is your own clone. Run `claude` at the
repository root. Accept Claude Code's folder-trust prompt only when the
displayed path is your own trusted clone. Never bypass trust for an unfamiliar
folder. Restart `claude` if project skills remain missing after trust.

Cursor is optional. If it opens **Agents**, choose **IDE** and use its terminal.
The lesson only needs a terminal and browser.

### Optional live-model connection

The required route stays scripted and offline. Claude Code is the builder; the
product's separate live-model path uses the Claude Agent SDK. Prepare your own
local Claude Code login before A1, but activate the product model only after A5
and only when your facilitator approves usage and cost.

Never copy credentials into chat, Git, browser fields, remote hosts, or another
participant's machine. Current Anthropic guidance says the local Agent SDK can
use your Claude Code login and then consumes your plan limits. An intentionally
configured API key uses the linked Console organization and may consume paid
API credits.

After A5, prove the model path with one bounded fixture run:

```sh
npm run investigate -- fixtures/incidents/bad-deploy.json --model sonnet --max-turns 8 --max-budget-usd 0.30 --dry-run
```

The SDK checks `--max-budget-usd` between model turns, so one turn can exceed
it. Strict MCP isolation keeps this lab's model context limited to telemetry.

Review the completed diagnosis, cost line, and tool trace. Only then may you
stop your own console and restart it with:

```sh
AGENT_MODEL=sonnet AGENT_LISTEN_WINDOW_MIN=1 npm run console
```

The console has no global model-budget guard. Submit at most one approved
`Investigate: ...` message. The health model name proves readiness only. Keep
the completed diagnosis and visible tool trace as the model-path proof. Stop
after one accepted proof. If authentication, plan limits, cost approval, or the
run fails, clear any exported model override and restart the required route:

```sh
env -u AGENT_MODEL AGENT_LISTEN_WINDOW_MIN=1 npm run console
```

See Anthropic's [Agent SDK quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart)
and [Claude plan guidance](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan).

Open [SOLO.md](SOLO.md#a1-map-the-repo-and-prove-setup). Start A1 with the
explicit `/show-me` prompt. It creates a read-only text map of the fixture,
runtime, trace, and console path. The second A1 prompt runs setup checks. The
main suite must pass. Only the A3, A4, A5, and A8 workshop tests must fail on
their exercise TODOs. `npm run workshop:check` locates unfinished markers. It
is not a completion gate.

Facilitators use [`FACILITATOR.md`](FACILITATOR.md) for the schedule, expected
starter failures and the manual fallback.

For a visual route through the AI-SDLC, start Claude Code with
`claude --plugin-dir ./course/ai-sdlc-mod` and run `/sdlc`. The optional mod
reads the first prompt from each A1–A9 section in `SOLO.md` and leaves every
human gate intact. Use the remaining copy prompts from `SOLO.md` or the slides.

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
| A6 | Start a sample incident and trace every diagnosis claim |
| A7 | Add one deterministic offline fixture case without lowering the floor |
| A8 | Test the exact incident-and-action gate; keep human action OPEN |
| A9 | Propose a lesson, define the hackathon, review and save the handoff |

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
