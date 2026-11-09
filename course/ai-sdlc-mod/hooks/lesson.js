const FLOW = [
  ["Setup", "A shallow repo map, green main suite, and expected red exercises", "You inspect the console and accept the setup"],
  ["Intent", "intent.md has three repeatable checks and a read-only boundary", "You choose and accept the operator outcome"],
  ["Contract", "The accepted A3 contract goes red, then green with customer impact", "You accept the contract before implementation"],
  ["Controls", "Chat refuses mutation and the focused hook test records a denial", "You make the human-owned hook edit"],
  ["Tool", "The read-only deploy result and exact trace arguments are visible", "You choose and review the edge case"],
  ["Evidence + gate", "Every diagnosis claim has a stable source:ref and an approval mismatch stays blocked", "You start the sample scenario and keep approval, execution, and resolution OPEN"],
]

export function parseSolo(markdown) {
  const headings = [...markdown.matchAll(/^## A(\d+)\. ([^\n]+)$/gm)]
  if (headings.length !== FLOW.length) throw new Error(`Expected 6 core SOLO assignments, found ${headings.length}`)
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
