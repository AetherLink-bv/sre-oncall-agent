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
  { length: 6 },
  (_, index) => `## A${index + 1}. Assignment ${index + 1}\n\nPaste this prompt into Claude Code.\n\n\`\`\`text\nprompt-${index + 1}\n\`\`\``,
).join("\n\n") + "\n\n## Optional A7. Extra evaluation\n\n```text\noptional-7\n```\n\n## Optional A9. Extra maintenance\n\n```text\noptional-9\n```"

test("rejects an assignment without its own prompt", () => {
  expect(() => parseSolo(soloFixture.replace("```text\nprompt-4\n```", "No prompt"))).toThrow()
  expect(() => parseSolo(soloFixture.replace("## Optional A7.", "## A7."))).toThrow()
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

  expect(parsed.length).toBe(6)
  expect(await ui.find({ key: "assignment-A6" })).toBeDefined()
  await ui.press({ key: "assignment-A6" })
  expect(await ui.find({ type: "Text", text: /A6 · Evidence \+ gate · OPEN/ })).toBeDefined()
  expect(await ui.find({ type: "Text", text: /Human gate: You start the sample scenario and keep approval, execution, and resolution OPEN/ })).toBeDefined()
  await ui.press({ key: "use-prompt" })
  expect(filled).toBe(parsed[5].prompt)
})
