# AI-SDLC Claude Code mod

This optional workshop view opens the six core `SOLO.md` assignments inside Claude Code. It shows the current phase, expected evidence, and the decision that remains with the participant. The prompt button fills Claude Code's input without submitting it. Optional A7 and A9 stay in `SOLO.md` outside this core route.

Mods require Claude Code 2.1.287 or newer. This workshop view was tested with
Claude Code 2.1.319. Start it from the repository root:

```bash
claude --plugin-dir ./course/ai-sdlc-mod
```

Run `/sdlc` to open the pane. Select A1 through A6, inspect the evidence and human gate, then press **Put prompt in input**. Review the prompt before you submit it.

The mod reads the prompt text from the repository's `SOLO.md`. It does not call a model, run a process, approve an action, execute a mitigation, or mark an incident resolved.

Validate and test it with:

```bash
claude plugin validate --strict ./course/ai-sdlc-mod
claude plugin test ./course/ai-sdlc-mod
```
