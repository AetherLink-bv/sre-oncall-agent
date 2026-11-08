import { expect, test } from "claude-code/testing"
import { parseSolo } from "../hooks/lesson.js"

const PANE = {
  plugin: "ai-sdlc-workshop",
  component: "Pane",
  requestId: "ai-sdlc-workshop",
  viewport: { columns: 140, rows: 40 },
  props: {
    title: "AI-SDLC",
    isFocused: true,
    bodyColumns: 64,
    placement: "dock",
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

const soloFixture = Array.from(
  { length: 9 },
  (_, index) => `## A${index + 1}. Assignment ${index + 1}\n\nPaste this prompt into Claude Code.\n\n\`\`\`text\nprompt-${index + 1}\n\`\`\``,
).join("\n\n")

test("rejects an assignment without its own prompt", () => {
  expect(() => parseSolo(soloFixture.replace("```text\nprompt-4\n```", "No prompt"))).toThrow()
})

test("shows a loading state while SOLO is reloading", async ($) => {
  const ui = await $.ui.mount({ ...PANE, surface: "terminal" })
  expect(await ui.find({ type: "Text", text: "Loading SOLO.md…" })).toBeDefined()
})

test("shows all SOLO assignments and fills the selected prompt", async ($, on) => {
  const parsed = parseSolo(soloFixture)
  let filled = ""

  on("fs.read", () => ({ value: soloFixture }))
  on("command.register", () => ({ value: undefined }))
  on("session.start", () => ({ cwd: "/work" }))
  on("ui.open", () => ({ value: { isPlaced: true } }))
  on("prompt.fill", ($, e) => {
    filled = e.text
    return { isFilled: true }
  })

  await $.session.start({ surface: "terminal", isInteractive: true, cwd: "/work" })
  await $.command.run({ command: "sdlc", args: "" })
  const ui = await $.ui.mount({ ...PANE, surface: "terminal" })

  expect(parsed.length).toBe(9)
  expect(await ui.find({ key: "assignment-A9" })).toBeDefined()
  await ui.press({ key: "assignment-A8" })
  expect(await ui.find({ type: "Text", text: /A8 · Gate · OPEN/ })).toBeDefined()
  expect(await ui.find({ type: "Text", text: /Human gate: You give the named approval/ })).toBeDefined()
  await ui.press({ key: "use-prompt" })
  expect(filled).toBe(parsed[7].prompt)
})
