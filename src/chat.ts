/**
 * chat.ts — the "Ask the agent" box
 * ---------------------------------------------------------------------------
 * Every message in the console goes through routeMessage(). The routing is
 * deterministic and happens BEFORE any model call:
 *
 *   "Watch the next deployment for five minutes."  → deployment watch (grammar, no model)
 *   "Stop the deployment watch."                   → stop
 *   "Investigate …" / "Something is broken: …"     → a full investigate() run (model or offline)
 *   "Roll back …" / "approve" / "resolve"          → REFUSED here: those are buttons a named human clicks,
 *                                                    never chat text the agent interprets
 *   anything else                                  → a question for the investigator (read-only tools,
 *                                                    free-text answer, no proposal)
 *
 * Owain's console doc says it in one line: "Chat recognition uses explicit
 * commands, not general natural-language planning." Same here.
 */
import { VERDICT_SCHEMA, type Incident } from "./contract.js";
import { investigate, type AgentRun } from "./agent.js";
import { parseStopCommand, parseWatchCommand, type WatchCommand } from "./deployWatch.js";
import { guessTag, lessonsStore, loadLessons, renderLessons } from "./lessons.js";
import { ONCALL_SYSTEM } from "./prompts.js";
import { resolveRuntime, type AgentEvent } from "./runtime.js";
import { ALLOWED_TOOLS, SERVER_NAME, createTelemetryServer, handlers } from "./tools.js";
import { type Telemetry } from "./telemetry.js";

export type Route =
  | { kind: "watch"; command: WatchCommand }
  | { kind: "stop" }
  | { kind: "investigate"; alert: string }
  | { kind: "refused"; reason: string }
  | { kind: "question"; text: string };

// Mutation requests are refused in chat: they are buttons a named human clicks,
// never chat text the agent interprets. A fixed grammar, checked before the
// investigate/question branches. Read-only questions (e.g. "Was the deploy the
// cause?") do not match.
export const MUTATION = /\b(?:roll[\s-]?back|approv(?:e|es|ed|al)|resolve[sd]?|scale|(?:flip|set|toggle)\s+(?:the\s+)?flag|close\s+(?:the\s+|this\s+)?incident|deploy\s+version\s+now)\b/i;

// Intent-aware exemptions, removed before MUTATION is tested. They never widen MUTATION:
//  - a blanket disclaimer ("Do not approve or execute anything.") states no request;
//  - the evidence question "Which evidence supports the (proposed) rollback?" names a
//    rollback as the thing examined, it does not ask for one.
// Anything else still hits MUTATION, e.g. "Do not approve and roll back now." or
// "Which evidence supports the rollback, then roll back now?".
const BLANKET_DISCLAIMER = /\bdo not (?:approve|execute|roll[\s-]?back|resolve|scale|close)(?: or (?:approve|execute|roll[\s-]?back|resolve|scale|close))* anything\b\.?/gi;
const EVIDENCE_QUESTION = /^(?:which|what) evidence (?:supports?|backs?|shows?) (?:the )?(?:proposed )?rollback\?/i;
const isMutationRequest = (t: string): boolean =>
  MUTATION.test(t.replace(BLANKET_DISCLAIMER, " ").replace(EVIDENCE_QUESTION, " "));

export const routeMessage = (text: string): Route => {
  const t = text.trim();
  if (parseStopCommand(t)) return { kind: "stop" };
  const w = parseWatchCommand(t);
  if (w.ok) return { kind: "watch", command: w.value };
  if (/^(?:watch|monitor)\b/i.test(t)) return { kind: "refused", reason: w.errors.join("; ") };
  if (isMutationRequest(t)) return { kind: "refused", reason: "mutations are buttons for a named human, not chat requests" };
  const inv = /^(?:investigate|triage|look into|something is (?:broken|wrong)|customers? (?:are|is) reporting)[:\s-]*(.*)$/i.exec(t);
  if (inv) return { kind: "investigate", alert: (inv[1] ?? "").trim() || t };
  return { kind: "question", text: t };
};

// ── free-text questions ──────────────────────────────────────────────────
export interface AskDeps {
  readonly telemetry: Telemetry;
  readonly model?: string | undefined; // undefined/offline → deterministic summary
  readonly telemetryContext?: string | undefined;
  readonly onEvent?: (e: AgentEvent) => void;
}

/** Offline: answer from the same tools, deterministically. Never pretends to be a model. */
const offlineAnswer = (text: string, t: Telemetry, telemetryContext: string): string => {
  const h = handlers(t);
  const m = h.summarize_metrics({});
  const d = h.list_deploys({}).slice(0, 3);
  const errs = h.search_logs({ level: "error", limit: 3 });
  const bp = m.breakpoints[0];
  const metricsRef = bp?.ts ?? m.last_ts ?? "window";
  const health = m.breakpoints.length === 0
    ? `${telemetryContext} [metrics:${metricsRef}]: error_rate ${m.error_rate_last}, p95 ${m.p95_ms_last} ms over ${m.points} buckets, no ≥2× jump.`
    : `${telemetryContext} [metrics:${metricsRef}]: ${bp?.what} ${bp?.from} → ${bp?.to}; this bucket may span a deploy. Latest snapshot error_rate ${m.error_rate_last}, p95 ${m.p95_ms_last} ms.`;
  return [
    `(offline investigator — scripted, not model evidence)`,
    health,
    `Latest deploys: ${d.map((x) => `[deploys:${x.id}] ${x.version} ${x.at.slice(11, 19)}`).join(" · ") || "none in telemetry"}.`,
    errs.length ? `Latest errors: ${errs.map((e) => `[logs:${e.ts}] ${e.msg}`).join(" | ")}` : "No error-level log lines.",
    `These references describe stored telemetry, not a live current-health check.`,
    `You asked: "${text}". For a full diagnosis with a proposal, send "Investigate: <what you see>".`,
  ].join("\n");
};

/** Real model: same read-only tools, same lessons, free-text answer, NO proposal field. */
export const ask = async (text: string, deps: AskDeps): Promise<string> => {
  const rt = resolveRuntime(deps.telemetry, deps.model);
  const telemetryContext = deps.telemetryContext ?? "Stored telemetry snapshot";
  if (rt.model === undefined) return offlineAnswer(text, deps.telemetry, telemetryContext);
  const lessons = renderLessons(await loadLessons(lessonsStore()), guessTag(text));
  let answer = "";
  for await (const e of rt.query({
    prompt: `${text}\n\n${lessons}`,
    options: {
      systemPrompt: `${ONCALL_SYSTEM}\n\nMode: QUESTION. The operator asked a question. Inspect this snapshot with summarize_metrics and list_deploys before answering. Use search_logs and get_diff if needed. Report unavailable tools as OPEN. Answer in plain prose with evidence references. Telemetry context: ${telemetryContext}. Do NOT return the JSON verdict and do NOT propose a mitigation; if they want one, tell them to send "Investigate: …".`,
      mcpServers: { [SERVER_NAME]: createTelemetryServer(deps.telemetry) },
      tools: [...ALLOWED_TOOLS], allowedTools: [...ALLOWED_TOOLS],
      permissionMode: "dontAsk", settingSources: [], maxTurns: 8, maxBudgetUsd: 0.3,
      ...(rt.model ? { model: rt.model } : {}),
    },
  })) {
    deps.onEvent?.(e);
    if (e.type === "result" && e.subtype === "success") answer = e.result ?? "";
  }
  return answer || "(no answer)";
};

// ── investigation from chat ──────────────────────────────────────────────
export const investigateFromChat = async (incident: Incident, deps: AskDeps): Promise<AgentRun> => {
  const rt = resolveRuntime(deps.telemetry, deps.model);
  return investigate(incident, {
    query: rt.query, model: rt.model, modelLabel: rt.label, telemetry: deps.telemetry, lessons: lessonsStore(),
    proposeLessons: true, ...(deps.onEvent ? { onMessage: deps.onEvent } : {}),
  });
};

export { VERDICT_SCHEMA };
