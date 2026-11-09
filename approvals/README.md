# Approval records

An approval record belongs to one incident and one proposed action. The
executor may continue only when all of these values match:

- `incident_id` matches the incident being handled;
- `proposal` matches the action the executor supports;
- `decision` is `approved`;
- `decided_by` names the person who made the decision.

A pending draft is not an approval. `decided_by: "OPEN"` means the decision is
still `HUMAN OPEN`. Claude Code must not create, sign, or edit a human decision
record.

The A8 checkpoint inside Assignment A6 proves this gate with deterministic
fixtures. It does not approve or execute an action in the live console.
