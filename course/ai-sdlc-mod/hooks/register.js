import { parseSolo } from "./lesson.js"

const PANE = "ai-sdlc-workshop"
let assignments = []
let selected = 0
let loadProblem = ""

export function register(on) {
  on("session.start", async ($, e, next) => {
    try {
      assignments = parseSolo(await $.fs.read("SOLO.md"))
      loadProblem = ""
    } catch (error) {
      assignments = []
      loadProblem = error instanceof Error ? error.message : String(error)
    }
    await $.command.register({ name: "sdlc", description: "Open the AI-SDLC workshop route" })
    $.ui.invalidate("ui.render")
    return next(e)
  })

  on("command.run", { command: "sdlc" }, async ($) => {
    await $.ui.open({ id: PANE, title: "AI-SDLC", focus: true, closeOnEscape: true, columns: 64 })
    return {}
  })

  on("ui.render", { component: "Pane" }, async ($, e, next) => {
    if (e.requestId !== PANE) return next(e)
    const { Box, Text, Button } = $.ui.resolve(e)
    if (loadProblem) return Text({ color: "red", children: [`SOLO.md could not be loaded: ${loadProblem}`] })

    const assignment = assignments[selected]
    if (!assignment) return Text({ dimColor: true, children: ["Loading SOLO.md…"] })
    const choose = (index) => {
      selected = index
      $.ui.invalidate("ui.render")
    }

    return Box({
      flexDirection: "column",
      children: [
        Text({ bold: true, children: ["Intent → Spec → Controls → Build → Evals → Gate → Maintain"] }),
        Box({
          flexDirection: "row",
          columnGap: 1,
          children: assignments.map((item, index) => Button({
            key: `assignment-${item.id}`,
            label: item.id,
            plain: true,
            dimColor: selected !== index,
            onPress: () => choose(index),
          })),
        }),
        Text({ bold: true, children: [`${assignment.id} · ${assignment.phase} · OPEN · ${assignment.title}`] }),
        Text({ children: [`Evidence to verify: ${assignment.evidence}`] }),
        Text({ color: "yellow", children: [`Human gate: ${assignment.humanGate}`] }),
        Button({
          key: "use-prompt",
          label: "Put prompt in input",
          onPress: () => $.prompt.fill({ text: assignment.prompt }),
        }),
      ],
    })
  })
}
