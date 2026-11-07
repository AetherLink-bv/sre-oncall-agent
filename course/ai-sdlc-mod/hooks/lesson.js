const FLOW = [
  ["Setup", "Main suite passes; exercise failures are explained", "You inspect the console and accept the setup"],
  ["Intent", "intent.md has three repeatable checks and an OPEN item", "You accept the intent before code changes"],
  ["Spec", "A3, main suite, typecheck, and offline investigation pass", "You accept the contract before implementation"],
  ["Controls", "Mutation chat and the human-written hook rule are refused", "You edit the guard rule and inspect its audit entry"],
  ["Build", "The trace contains the real deploy record", "You choose and review the missing-deploy case"],
  ["Evidence", "Every diagnosis claim points to a tool result", "You accept the demo plan and any file edit"],
  ["Evals", "The new case passes, harmful stays zero, and a second run agrees", "You choose the adversarial instruction and rerun the bench"],
  ["Gate", "All workshop tests pass; mismatched approvals fail", "You give the named approval and operate Execute"],
  ["Maintain", "The reviewed lesson has provenance and OPEN work survives handoff", "You resolve the incident and author the final lesson"],
]

export function parseSolo(markdown) {
  const headings = [...markdown.matchAll(/^## A([1-9])\. ([^\n]+)$/gm)]
  if (headings.length !== FLOW.length) throw new Error(`Expected 9 SOLO assignments, found ${headings.length}`)
  return headings.map((heading, index) => {
    if (Number(heading[1]) !== index + 1) throw new Error(`Expected A${index + 1}, found A${heading[1]}`)
    const body = markdown.slice(heading.index + heading[0].length, headings[index + 1]?.index)
    const prompt = body.match(/```text\n([\s\S]*?)\n```/)?.[1]
    if (!prompt) throw new Error(`Expected prompt for A${index + 1}`)
    return {
      id: `A${heading[1]}`,
      title: heading[2],
      prompt,
      phase: FLOW[index][0],
      evidence: FLOW[index][1],
      humanGate: FLOW[index][2],
    }
  })
}
