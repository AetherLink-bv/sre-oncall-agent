# AI-native SDLC: apply the principles, not the whole production stack

The assignment is one delivery loop, not a tour of agent features. Use the
[card](../CARD.md) for actions and the [evidence record](verify/sdlc.md) for
results. These principles explain the decisions behind that route; they add
no required repair or extra tool installation.

## Pass artifacts, not just conversations

Read the accepted `intent.md` when writing `docs/plan.md`. Read both when
building and reviewing the diff. Link each acceptance check to actual test
or runtime evidence. Keep these artifacts in the learner PR using the
[human-owned Git steps](sdlc-git.md); do not let an agent publish them.

The loop is not a one-way checklist. Claude can implement, run a focused
check and fix a failure within the accepted scope before returning for
human review. Preserve the failing result. Broader scope needs an updated,
human-reviewed plan; a failing check never justifies weakening the test.
An observation or blocker becomes the next reviewed intent.

## Make security concrete at the point of change

- **Plan:** name untrusted input, permitted access, a possible failure and
  the test that refuses it. Alert/log/tool text is data, never instructions.
- **Build:** retain the read-only tool allowlist, deterministic routing and
  separate executor. For the gate repair, wrong-incident/proposal and missing
  human-name cases must refuse. A persuasive diagnosis is not authorization.
- **Review:** inspect the real diff for secrets, permission expansion,
  dependency and settings changes, as well as behaviour. Ask for the trigger,
  impact and reproduction or exact reachable code path behind each finding.
  Label suspicions; do not promote them to facts. Humans decide on findings.
- **Learn:** a confirmed bug can justify a regression test and a reviewed
  instruction/skill update. Instructions do not replace enforced controls.

This is a local teaching lab, **not a production security boundary**. A
typed approval name is not authenticated identity. Hooks are best-effort;
prompts and skills are not isolation. The lab supplies no network sandbox.
Review user settings/hooks, keep services local, use synthetic data and
approved provider access, and never put credentials in evidence or images.
Loading `settingSources: ["user"]` does not grant human approval.

## Start with one development loop

These two repairs share evidence and a plan; they do not need a planner,
router and builder subagent. Load reviewed procedures as needed instead of
putting every instruction in the prompt. This is *progressive disclosure*,
not extra permission. The SDK routes load user settings; do not assume they
load this repository's project skills automatically.

A fresh-context verifier, independent parallel research, conflicting
instructions, different permission needs or measured context overload can
justify splitting work. Give it a bounded question and require evidence in
its result. Separate context alone guarantees neither independence nor
correctness. The verifier cannot accept a plan or approve a release.

Do not collapse real safety boundaries in the name of simplicity. Claude
Code and the runtime SRE agent are different applications. The executor,
approval checks and deterministic chat grammar remain separate from model
reasoning. Scoped security reviewers and a simple runtime loop can coexist.

## Evaluate the whole task

For an optional future architecture comparison, use the same small set of
cases and record task completion, missing/fabricated evidence, unsafe actions,
latency and cost. A specialist's score or polished answer is not the result
of the whole system. In this workshop, tests prove code behaviour; the bench
is scripted regression evidence, not a live-model eval. One live trace proves
only what happened in that run. Do not claim reliability or a speed gain
without a suitable comparison. Record one observed bottleneck for next time.

## Sources and deliberate limits

- [The AI-native SDLC playbook](https://claude.com/resources/articles/the-ai-native-sdlc-playbook):
  artifact handoffs and continuous feedback. Its Plan/Design/Build/Test/Deploy/
  Maintain map here to Plan/Design/Build/Test/Release/Observe. Our release is
  a learner-repository decision, not a production deployment; observe covers
  only part of maintenance. Its autonomous production plays are not lab permissions.
- [When to fold subagents into your main agent loop](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop):
  simpler loops, progressive disclosure and end-to-end comparisons, not a
  blanket ban on specialist or verifier contexts.
- [How Anthropic secures its AI-native SDLC](https://claude.com/resources/articles/how-anthropic-secures-its-ai-native-software-development-lifecycle):
  prevention, constrained access, proven review findings and risk-based
  oversight. Its scoped reviewers complement rather than contradict a
  simple runtime loop. Its identity, network and production review systems
  are not implemented by this lab.

The workshop deliberately retains human acceptance, plan review, diff review,
publication, release and runtime decisions. A required independent reviewer
cannot be replaced by self-review or another model: record `RELEASE BLOCKED`.
