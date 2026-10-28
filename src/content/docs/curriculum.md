---
title: Curriculum (draft v2, for review)
description: The full plan for "AI in Production". It covers how every lesson works, the running project, and each module's lessons, failure modes, design drills, quizzes and labs.
---

:::caution[Status: draft for review]
No lessons will be written until this curriculum is finalized. Comment on anything you want added, removed, or reordered. The [research page](/research/) shows the job-market data it's based on.
:::

**Target roles:** Applied AI Engineer → GenAI Engineer → Forward Deployed Engineer (FDE).
**Assumed background:** about 2 years as a software engineer, frontend plus Python/FastAPI. Programming basics are not taught, and neither is ML theory you won't use.
**Pace:** about 10 hours a week, roughly 22 weeks for modules plus capstones.

---

## 1. Course philosophy: think in systems from day 1

You won't learn a feature first and "productionize it later." From the first lesson you treat the LLM like any other **unreliable, slow, expensive, non-deterministic external dependency**, and you design around that.

Five questions are asked in **every** lesson, until you ask them without thinking:

1. **Why does this exist?** What problem does it solve, and what happens if we skip it?
2. **What can fail?** Name the failure modes: wrong output, slow output, no output, expensive output, unsafe output.
3. **How would we know?** Which signal, metric, eval or trace tells us it failed?
4. **What's the blast radius?** Who gets hurt, how much does it cost, and can it be undone?
5. **What's the trade-off?** Quality vs latency vs cost vs complexity. What are we choosing and why?

---

## 2. How every lesson works (the 7-beat format)

Every lesson follows the same rhythm, so it stays interactive and doesn't turn into a wall of text.

| Beat | What happens | Example (Streaming lesson) |
|---|---|---|
| 🚨 **1. Incident** | A short, realistic production story as the hook | "Users say the assistant 'freezes' for 20 seconds and then dumps a wall of text. Support tickets doubled." |
| 🤔 **2. Why** | The problem in plain terms, and what happens if we ignore it | Perceived latency vs real latency; time-to-first-token as a UX metric |
| 🧠 **3. Concept** | The idea, explained through an **interactive widget** | A slider that compares "wait for the full response" with streaming on a simulated 12-second answer |
| 🛠️ **4. Build** | Code added to the **running project** (see below) | FastAPI SSE endpoint plus a browser stream reader |
| 💥 **5. What breaks in production** | Failure-mode cards: symptom → cause → detection → mitigation | Proxy buffering kills the stream; a cancelled tab doesn't stop generation (cost leak); a mid-stream error after a 200 OK |
| 🏗️ **6. Design drill** | "You're the architect": a scenario with options; **you commit to an answer before the reveal** | "Mobile clients on flaky 3G. SSE, WebSockets, or polling? Defend it." |
| ✅ **7. Quiz + checkpoint** | 4–6 questions with explanations for every option, plus a "can you do this without notes?" checklist | — |

Each module also ends with:

- **🔥 Incident Drill:** a branching, choose-your-path simulation. A pager goes off, you read traces and logs, choose actions, and see the consequences. A wrong choice is not fatal, but the drill shows what it cost.
- **🧪 Lab:** a feature you build on the running project, with acceptance criteria that **include an eval and a failure test**, not just "it works."
- **🏁 Module quiz:** 10–15 questions, scored, with progress saved in your browser.

---

## 3. Interactive components (built in Astro)

These widgets are built once and reused across the course. None of them need an API key, and all of them run in the browser.

| Component | Used for |
|---|---|
| `<Quiz>` | Multiple choice, multi-select, and "order the steps," with an explanation per option and a score |
| `<ThinkFirst>` | Asks you to write or choose your answer **before** revealing the expert answer |
| `<FailureCard>` | A flippable card: symptom → root cause → how to detect → mitigation |
| `<IncidentDrill>` | Branching scenario engine (pager → investigate → act → outcome) |
| `<CostCalculator>` | Tokens × price × traffic → monthly bill, with caching, batching and model-tier toggles |
| `<TokenViz>` | Paste text and see how it tokenizes, and how much of the context window it uses |
| `<ChunkingPlayground>` | Paste a document, change the chunk size/overlap/strategy, and watch tables and sentences get split |
| `<RetrievalPlayground>` | A toy corpus: compare keyword, vector and hybrid ranking, and toggle a reranker |
| `<AgentLoopStepper>` | Step through an agent trace turn by turn: think → tool call → result → next |
| `<InjectionLab>` | A simulated assistant you try to prompt-inject, then defend with layered guardrails |
| `<ArchitectureDiagram>` | An interactive system diagram that grows each module; hover a box to see its failure modes |
| `<Progress>` | Lesson completion, quiz scores and badges, saved in `localStorage` |

---

## 4. The running project: **"Relay"**, an AI ops assistant for a logistics company

Instead of disconnected toy demos, you build **one product** throughout the course, like a real FDE engagement. The customer is *Acme Logistics* (fictional): support agents drown in tickets, shipment questions, and policy PDFs.

| After module | Relay can… |
|---|---|
| 1 | Classify and draft replies to tickets: streamed, typed, with retries and a cost budget |
| 2 | Show answers in a polished UI with stop/regenerate, sources and feedback buttons |
| 3 | Answer policy questions from 200 messy PDFs, with citations, and refuse when unsure |
| 4 | Look up shipments, issue refunds (**with human approval**), and survive restarts |
| 5 | Talk to Acme's "CRM" and "shipment DB" through MCP servers you wrote, with permissions |
| 6 | Have an eval suite that blocks a bad prompt change in CI |
| 7–8 | Be traced, monitored, cached and routed, with a cost/latency/quality dashboard |
| 9 | Resist prompt injection hidden inside customer emails and PDFs |
| 10 | Run deployed on a cloud URL with fallbacks across providers |
| 11 | Ship with a discovery doc, a pilot plan and an ROI report, all written by you |

Stack: **FastAPI** (backend), **React/TypeScript** (Relay UI, your strength), **Postgres + pgvector**, **Docker**, **Langfuse** (tracing), **GitHub Actions** (eval CI). Examples use one provider SDK, and every concept is explained in provider-neutral terms.

---

## 5. Modules

Every module below lists: lessons · 💥 failure modes you'll study · 🏗️ design drills · 🎮 interactive pieces · 🧪 lab.

### Phase 0: Mindset (week 0)

#### Module 0 · Start Here: the production mindset
**Lessons**
1. The three roles (FDE, Applied AI, GenAI Engineer): what they do day to day and which to target first
2. Skills map: what 2026 job postings actually ask for
3. **Why AI systems fail differently**: non-determinism, silent failure (confidently wrong), cost as a failure mode, provider outages
4. **Anatomy of a production AI system**: the reference architecture you'll build (gateway, context, model, tools, guardrails, evals, tracing)
5. Meet Relay and Acme Logistics, plus dev environment setup (uv, FastAPI, keys and secrets hygiene)

💥 **Failure modes:** the demo that worked on 5 examples and failed on 5,000; the $40k surprise bill; a leaked API key in a repo
🏗️ **Design drill:** "The CEO wants a chatbot by Friday." What do you ask before writing code?
🎮 `<ArchitectureDiagram>` (v0), `<IncidentDrill>`: "The demo is tomorrow and the model is down"
🧪 **Lab:** Relay skeleton, plus a smoke test that calls a model and logs tokens and cost

---

### Phase 1: Foundations (weeks 1–4)

#### Module 1 · LLM Foundations for Engineers
**Lessons**
1. How LLMs behave: tokens, context windows, reasoning/"thinking" models, non-determinism
2. Pricing math: estimating cost **before** building (input vs output vs cached tokens)
3. Choosing a model: frontier vs small vs open-weight; running a bake-off on *your* data
4. Your first production-grade call: system prompts, history, timeouts, retries with backoff, typed errors
5. Streaming end to end: async FastAPI → SSE → browser
6. Structured outputs: Pydantic schemas, constrained decoding, validation and repair
7. From prompt engineering to **context engineering**: prompts as specs, examples, what goes in context and when
8. Treat prompts as code: versioning, tests, and your **first tiny eval** (yes, already in Module 1)

💥 **Failure modes:** output truncated at `max_tokens`; 429 rate limits plus retry storms; timeouts on long generations; history growing until cost or context explodes; invalid JSON that slips past a lazy parser; refusals not handled; model deprecated under you; a flaky test because the output changed
🏗️ **Design drills:** "Ticket triage at 50k tickets/day: which model tier, sync or batch, and what does it cost?" · "Your JSON parse rate is 97%. Is that good enough?"
🎮 `<TokenViz>`, `<CostCalculator>`, `<ThinkFirst>` on retry strategies, `<IncidentDrill>`: "The bill tripled overnight"
🧪 **Lab:** Relay ticket triage: streamed draft reply, typed classification, retry/timeout policy, cost per ticket logged, and a 20-example eval

#### Module 2 · AI-Native UX (your frontend advantage)
**Lessons**
1. Beyond chat: inline, ambient, batch and agentic UX patterns. Pick the interface before the model.
2. Streaming UI done right: partial markdown, code blocks, cancellation, reconnect/resume
3. Designing for wrong answers: citations, confidence cues, "show your work," easy correction
4. Human-in-the-loop UI: approvals, edit-before-send, undo, diff review
5. Generative UI: the model picks components (tool → component mapping)
6. Feedback that becomes data: thumbs, edits and implicit signals feeding your evals

💥 **Failure modes:** a user clicks Stop but the backend keeps generating (cost leak); double-submits; markdown flicker and layout shift; users over-trusting a fluent wrong answer; feedback buttons nobody clicks (biased data)
🏗️ **Design drill:** "Refunds over $500 need approval. Design the UX and the backend contract."
🎮 Side-by-side "bad vs good AI UX" demos, `<Quiz>`
🧪 **Lab:** Relay UI: streaming, stop/regenerate, source panel, approval card, and feedback stored for evals

---

### Phase 2: Core building blocks (weeks 5–11)

#### Module 3 · Retrieval & RAG
**Lessons**
1. Do you even need RAG? Long context plus caching vs RAG vs fine-tuning vs plain search
2. Ingestion reality: PDFs, tables, scans, HTML. Garbage in, garbage out.
3. Chunking and metadata design
4. Embeddings and vector stores (pgvector first; when to use a dedicated DB)
5. Hybrid search (BM25 + vectors), query rewriting, reranking
6. Grounded generation: citations, "I don't know," handling conflicting sources
7. Permission-aware retrieval (who is allowed to see which document)
8. Agentic and multi-hop RAG
9. Measuring retrieval: recall@k, MRR, faithfulness, answer relevance

💥 **Failure modes:** a table split across chunks; a stale index serving an outdated policy; switching embedding models without re-indexing; an empty result set → hallucination; **retrieval leaking documents the user shouldn't see**; duplicates crowding out the right answer; "lost in the middle"; PDF parsing producing gibberish
🏗️ **Design drills:** "Policies change weekly and must never be stale. Design the ingestion pipeline." · "Sales and HR docs in one index: how do you prevent leaks?"
🎮 `<ChunkingPlayground>`, `<RetrievalPlayground>`, `<IncidentDrill>`: "The bot quoted last year's refund policy to 3,000 customers"
🧪 **Lab:** Relay policy Q&A over 200 messy PDFs, with hybrid search, reranking, citations, refusal, and a retrieval eval

#### Module 4 · Tools, Workflows & Agents
**Lessons**
1. Tool calling from first principles: write the loop yourself
2. Workflows vs agents: the "do you need an agent?" checklist
3. Patterns: chaining, routing, parallelization, orchestrator–workers, evaluator–optimizer
4. **Harness engineering**: the loop, tool design, context management/compaction, budgets, stop conditions
5. State and memory: short-term, long-term, and what never to store
6. Human-in-the-loop and approval gates for side effects
7. Durable execution: checkpoints, idempotency, resuming after a crash
8. Frameworks compared (LangGraph, PydanticAI, OpenAI Agents SDK, Claude Agent SDK, managed agents), plus when to use none
9. Multi-agent: when it helps and when it only multiplies cost

💥 **Failure modes:** infinite loops; wrong tool arguments; **a refund issued twice because of a non-idempotent retry**; an irreversible action without approval; context bloat from huge tool outputs; runaway cost; a crash mid-task leaving half-done state; too many tools confusing selection
🏗️ **Design drills:** "Design the refund tool: schema, permissions, idempotency key, approval threshold." · "This task: workflow or agent? Justify it."
🎮 `<AgentLoopStepper>` (debug a looping agent from its trace), `<IncidentDrill>`: "The agent emailed 400 customers"
🧪 **Lab:** the Relay agent: shipment lookup plus refunds with approval, idempotency, a cost budget, and resumption after a restart

#### Module 5 · MCP & Enterprise Integrations
**Lessons**
1. Model Context Protocol: tools, resources, prompts, transports, and why it won
2. Build an MCP server in Python for an internal API and a database
3. Remote MCP: OAuth, multi-tenancy, rate limits
4. Tool design for models: names, descriptions, errors the model can recover from
5. Enterprise integration: SSO, least-privilege scopes, CRMs/ticketing/warehouses
6. Agent-to-agent protocols (overview)

💥 **Failure modes:** over-broad tokens (the agent can delete the CRM); tool-description poisoning from a third-party server; an upstream API schema change breaking tools silently; hammering a customer's legacy system with rate-limit issues; tokens leaking into logs
🏗️ **Design drill:** "Acme's security team will only allow read-only access for the pilot. Redesign Relay."
🎮 `<Quiz>`, `<ThinkFirst>` on scope design, `<ArchitectureDiagram>` update
🧪 **Lab:** MCP servers for Acme's mock CRM and shipment DB, consumed by the Relay agent, with permission-scoped tools

---

### Phase 3: Quality (weeks 12–14)

#### Module 6 · Evals: the most important module
**Lessons**
1. Error analysis first: read 100 traces, categorize failures, *then* pick metrics
2. Building datasets: production samples, synthetic data, edge cases, golden sets
3. Code-based checks vs LLM-as-judge, and when each one fits
4. Calibrating an LLM judge against human labels
5. RAG evals (retrieval vs generation) and agent evals (trajectory vs outcome)
6. Evals in CI: regression gates on prompt, model and code changes
7. Online evals: sampling production traffic, feedback loops, drift
8. Tooling tour: promptfoo, DeepEval, Braintrust, Langfuse/LangSmith datasets

💥 **Failure modes:** a judge that prefers longer answers; an eval set that doesn't look like production; overfitting prompts to the eval; flaky evals that nobody trusts; "all green" while users complain
🏗️ **Design drill:** "A new model is 30% cheaper. Prove (or disprove) it's safe to switch by Friday."
🎮 `<ThinkFirst>` (label traces yourself, then compare with an expert), `<Quiz>`, `<IncidentDrill>`: "The prompt tweak that broke refunds"
🧪 **Lab:** the Relay eval suite (triage, RAG, agent) running in GitHub Actions, blocking a deliberately bad PR

---

### Phase 4: Production (weeks 15–19)

#### Module 7 · LLMOps & Observability
**Lessons:** tracing every LLM and tool call (OpenTelemetry GenAI conventions, Langfuse) · prompt and config versioning · cost, latency and quality dashboards · LLM gateways (abstraction, fallbacks, budgets, keys) · safe model migrations · incident response and post-mortems for AI features

💥 **Failure modes:** an incident with no traces; PII in logs; a silent provider-side model change; nobody knows which prompt version is live; alert fatigue
🎮 `<IncidentDrill>`: "p95 latency went from 3s to 25s, so find it in the traces"

#### Module 8 · Performance & Cost
**Lessons:** prompt caching and semantic caching · model routing and cascades · reasoning-effort tuning · batch APIs · concurrency with asyncio, queues, background jobs · latency budgets and perceived latency

💥 **Failure modes:** a timestamp in the system prompt silently breaking the cache; a semantic cache serving another user's answer; a router sending hard questions to the small model; a thundering herd into rate limits; a queue backlog
🎮 `<CostCalculator>` (advanced), design drill: "Cut cost 60% without losing quality: in what order do you try things?"

#### Module 9 · Security, Safety & Governance
**Lessons:** OWASP Top 10 for LLM apps · direct and **indirect** prompt injection · excessive agency and least privilege · sandboxing code execution · PII detection/redaction and data retention · guardrails (deterministic + model-based) · red-teaming your own system · compliance context (SOC 2, GDPR, EU AI Act)

💥 **Failure modes:** an instruction hidden in a customer email triggers a refund; data exfiltration through a markdown image link; system prompt leakage; jailbreaks; PII sent to a third-party model
🎮 `<InjectionLab>`: attack Relay, then defend it layer by layer

#### Module 10 · Deployment & Models
**Lessons:** containerizing AI services · deploying FastAPI (Cloud Run/ECS/Fly) · cloud AI platforms (Bedrock, Vertex AI, Azure AI Foundry) · open-weight models with vLLM/Ollama and when self-hosting pays off · fine-tuning and distillation: when it beats prompting + RAG · multimodal and voice/realtime agents

💥 **Failure modes:** a provider outage with no fallback; region/model availability mismatch; cold starts; GPU out-of-memory; a fine-tune that regressed on everything you didn't train on
🧪 **Lab (Modules 7–10):** production Relay with tracing, a gateway with provider fallback, caching, an injection test suite, CI evals, and deployment to a public URL with a dashboard

---

### Phase 5: The field (weeks 20–22)

#### Module 11 · Forward Deployed Engineering
**Lessons**
1. The engagement lifecycle: discovery → POC → pilot → production → expansion
2. Discovery: finding the workflow where AI pays off; defining success metrics *with* the customer
3. The data and access audit: what you'll actually be allowed to touch
4. Scoping and saying no; the one-page design doc
5. Working inside customer environments: VPCs, legacy systems, security reviews
6. Demos that build trust; pilots that prove ROI
7. Handover, documentation, and turning field pain into product feedback
8. Interview prep: LLM system design, take-homes, customer role-plays

💥 **Failure modes:** solving the wrong problem; a pilot with no success metric; data access arriving in month 3; scope creep; your champion leaving; the security review blocking go-live
🎮 Role-play `<IncidentDrill>`s: "The customer's CTO says the accuracy is 'not good enough'. Respond."

---

### Phase 6: Capstones (after the modules)

| # | Project | Proves |
|---|---|---|
| 1 | **Enterprise knowledge assistant**: RAG over messy docs, permissions, citations, evals | RAG, evals, UX |
| 2 | **Operations agent** using MCP against mock CRM/ticketing systems, with approvals and durability | Agents, MCP, HITL |
| 3 | **Eval & observability platform** for projects 1–2: CI gates, judge calibration, dashboards | Evals, LLMOps |
| 4 | **FDE simulation**: customer brief → discovery doc → shipped pilot → ROI report and post-mortem | End-to-end FDE |

Each capstone ships with a public URL, an eval report, and a written **post-mortem of what failed**. That's what hiring managers ask about.

---

## 6. Open questions to finalize

1. **Pace:** is about 10 hrs/week (about 22 weeks) right, or should it be compressed?
2. **Provider:** one SDK in examples (Anthropic) with provider-neutral concepts, or show two providers side by side?
3. **Running project:** keep "Relay for Acme Logistics", or pick a domain closer to your target companies (fintech, healthcare, dev tools…)?
4. **Order:** evals currently come in Module 6 (with tiny evals from Module 1). Move the full module earlier?
5. **Anything missing?** For example voice agents, computer-use agents, or a deeper fine-tuning track.
