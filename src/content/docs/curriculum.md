---
title: Curriculum
description: The full plan for "AI in Production". It covers how every lesson works, the running project, all modules with their failure modes and practice ladders, the electives, and the system-design case studies.
---

**Target roles:** Applied AI Engineer → GenAI Engineer → Forward Deployed Engineer (FDE). The [research page](/research/) shows the 2026 job-market data behind this plan.
**Assumed background:** about 2 years as a software engineer, frontend plus Python/FastAPI. Programming basics aren't taught, and neither is ML theory you won't use.
**Pace:** about 10 hours a week, roughly 24 weeks for the core modules. Electives and case studies are extra.
**Stack:** Python + FastAPI (AI backend) · React/TypeScript + Vercel AI SDK (AI frontend) · Postgres + pgvector · Docker · Langfuse · GitHub Actions. Examples use the Anthropic SDK, and every concept is explained in provider-neutral terms.

---

## 1. Think in systems from day 1

You won't build a feature first and "productionize it later." From the first lesson you treat the LLM as an **unreliable, slow, expensive, non-deterministic external dependency**. Every lesson asks five questions until they become reflexes:

1. **Why does this exist?** What breaks if we skip it?
2. **What can fail?** Wrong, slow, missing, expensive, or unsafe output.
3. **How would we know?** Which metric, eval, trace or alert?
4. **What's the blast radius?** Who gets hurt, how much does it cost, can it be undone?
5. **What's the trade-off?** Quality vs latency vs cost vs complexity.

## 2. How every lesson works

| Beat | What happens |
|---|---|
| 🚨 **Incident** | A short production story as the hook |
| 🤔 **Why** | The problem, and the cost of ignoring it |
| 🧠 **Concept** | Explained with an interactive widget or diagram |
| 🛠️ **Build** | Code added to the running project |
| 💥 **What breaks** | Failure cards: diagnose the symptom yourself, then reveal cause → detection → fix |
| 🏗️ **Design drill** | You must write your answer before the expert answer unlocks |
| 🏋️ **Build it yourself** | A practice ladder: **Warm-up → Stretch → Boss level** projects to try on your own |
| ✅ **Quiz** | Every option has an explanation; your best score is saved |

Modules also include **🔥 incident drills**: branching simulations where your choices add (or save) minutes of user impact.

## 3. The running project: **Relay**

You build one product the whole way through, like a real FDE engagement. *Acme Logistics* (fictional) has support agents drowning in tickets, shipment questions and policy PDFs. Relay grows module by module:

| After module | Relay can… |
|---|---|
| 1 | Triage tickets: streamed draft replies, typed classification, retries, a cost budget, a first eval |
| 2 | Run in a real UI: stop/regenerate, sources, approval cards, feedback capture |
| 3–4 | Answer from 200 messy policy PDFs with hybrid search, reranking, citations, and refusal when unsure |
| 5 | Have an eval suite in CI that blocks bad prompt/model changes |
| 6 | Look up shipments and issue refunds **with human approval**, idempotency and crash recovery |
| 7 | Reach Acme's CRM and shipment DB through MCP servers you wrote |
| 8 | Resist prompt injection in customer emails; run tools sandboxed |
| 9–10 | Be traced, versioned, cached and routed, with a cost/latency/quality dashboard |
| 11 | Run deployed on a cloud URL with provider fallback |
| 12 | Ship with a discovery doc, a pilot plan and an ROI report |

---

## 4. Core modules

### Phase 0: Mindset

#### Module 0 · Start Here: the production mindset *(week 0)*
1. [How this course works](/start/welcome/)
2. [The roles: FDE vs Applied AI vs GenAI Engineer](/start/roles/)
3. [The reality check: prototypes vs production](/start/reality-check/): the 10-line prototype trap, deterministic vs stochastic software, **when NOT to use an LLM**
4. [Anatomy of a production AI system](/start/production-stack/): gateway, cache, router, guardrails, RAG, agent, evals, tracing (with diagrams)
5. [Meet Relay + dev setup](/start/meet-relay/)

### Phase 1: Foundations

#### Module 1 · LLM Foundations for Engineers *(weeks 1–3)*
1. [How LLMs behave](/foundations/how-llms-work/): tokens, context windows, thinking models, non-determinism
2. [Cost math before code](/foundations/cost-math/)
3. [Choosing a model](/foundations/choosing-a-model/): tiers, open-weight models, running a bake-off
4. [The production-grade LLM call](/foundations/production-call/): timeouts, retries, typed errors, stop reasons, refusals
5. [Streaming end to end](/foundations/streaming/): async FastAPI → SSE → browser
6. [Structured outputs](/foundations/structured-outputs/): native constrained decoding, how grammar-constrained sampling works, Pydantic, semantic validation and repair loops
7. [Context engineering](/foundations/context-engineering/): roles as trust boundaries, delimiters, placement, dynamic few-shot, prompt caching
8. [Prompts as code + your first eval](/foundations/prompts-as-code/): versioned templates, golden sets, CI gates

#### Module 2 · AI-Native UX with the Vercel AI SDK *(weeks 4–5)*
1. [Beyond chat: pick the interface before the model](/ai-ux/interface-patterns/): inline, ambient, batch and agentic patterns; the seven states; the autonomy dial
2. [Streaming UIs with the Vercel AI SDK](/ai-ux/ai-sdk/): `useChat`; **Pattern A** (React + FastAPI speaking the AI SDK protocol) vs **Pattern B** (full TypeScript)
3. [Generative UI](/ai-ux/generative-ui/): tool calls rendered as typed React components, safely
4. [Designing for wrong answers](/ai-ux/designing-for-wrong-answers/): verified citations, honest uncertainty, cheap correction
5. [Human-in-the-loop approvals](/ai-ux/human-in-the-loop/): `toolApproval`, approval cards, idempotency, approval fatigue
6. [Feedback that becomes eval data](/ai-ux/feedback-loops/): edit ratios, traces, the feedback flywheel, and the Module 2 lab

### Phase 2: Retrieval

#### Module 3 · Embeddings & Vector Search from Scratch *(week 6)*
1. [The geometry of meaning](/embeddings/geometry-of-meaning/): embeddings, semantic vs keyword search (live playground), choosing a model, the index contract
2. [Distance metrics demystified](/embeddings/distance-metrics/): cosine, dot product, L2, and the normalization trick (draggable vectors)
3. [Why vector search is hard at scale](/embeddings/brute-force-and-scale/): B-trees vs high dimensions, brute-force cost, the curse of dimensionality, memory maths and quantization
4. [HNSW: approximate search that scales](/embeddings/hnsw/): layers, `M` / `ef_construction` / `ef_search`, recall@k, a benchmark you run yourself
5. [pgvector in production](/embeddings/pgvector/): schema, the filtering pitfall, iterative scans, multitenancy, blue/green re-indexing, and the Module 3 lab

#### Module 4 · Production RAG *(weeks 7–9)*
- Do you even need RAG? Long context + caching vs RAG vs search vs fine-tuning
- Ingestion reality: PDFs, tables, scans, HTML. Freshness and re-indexing pipelines
- Chunking: recursive, markdown-aware, semantic; **prepending titles/sections** to chunks
- Hybrid search: BM25 for exact codes like `ERR_AUTH_8091`, plus vectors, fused with **Reciprocal Rank Fusion**
- Two-stage retrieval: bi-encoders vs **cross-encoder rerankers**
- Query transformations: rewriting, **HyDE**, multi-query
- **Parent-document retrieval** (small chunks to search, big chunks to read)
- Grounded answers: citations, "I don't know," conflicting sources
- **Permission-aware retrieval** (no document leaks)
- Agentic and multi-hop RAG
- 🎮 Chunking playground, retrieval playground, incident drill: "The bot quoted last year's refund policy to 3,000 customers"

### Phase 3: Quality

#### Module 5 · Evals & CI Regression Testing *(weeks 10–11)*: moved earlier so everything after it gets measured
- Why `assert output == "Paris"` dies: silent prompt regressions
- **Error analysis first:** read 100 traces, build a failure taxonomy, *then* choose metrics
- Datasets: production samples, synthetic data, edge cases, golden sets
- Code-based checks vs **LLM-as-judge** (rubrics, G-Eval style), and **calibrating judges** against human labels
- RAG metrics: faithfulness, answer relevance, context precision/recall (RAGAS-style), diagnosing retrieval vs generation bugs
- Agent evals: trajectory vs outcome
- CI gates in GitHub Actions; online evals on sampled production traffic
- Tool tour: promptfoo, DeepEval, RAGAS, Braintrust, Langfuse datasets

### Phase 4: Agents

#### Module 6 · Tools, Workflows & Agents *(weeks 12–14)*
- Tool calling from first principles: you write the loop
- Workflows vs agents, and the "do you need an agent?" checklist
- Patterns: chaining, routing, parallelization, orchestrator–workers, evaluator–optimizer
- The ReAct cycle (thought → action → observation) and self-correction from tool errors
- **Harness engineering:** tool design, context management/compaction, stop conditions
- **Circuit breakers:** max iterations, token/$ budgets, repeated-action (cycle) detection
- Memory: scratchpads, rolling summaries, long-term episodic memory, and what never to store
- **Stateful graphs with LangGraph:** typed state, nodes, conditional edges, supervisor multi-agent, `interrupt` for approvals, Postgres checkpoints, and time-travel replay
- Durable execution and idempotency; framework comparison (LangGraph, PydanticAI, OpenAI Agents SDK, Claude Agent SDK, AI SDK agents, managed agents)
- Multi-agent: when it helps, and when it only multiplies cost

#### Module 7 · MCP & Enterprise Integrations *(week 15)*
- The Model Context Protocol: tools, resources, prompts, transports
- Build MCP servers in Python for an internal API and a database
- Remote MCP: OAuth, multi-tenancy, rate limits
- Tool design for models: names, descriptions, recoverable errors
- Consuming MCP from your Python agent **and** from the AI SDK
- Enterprise integration: SSO, least-privilege scopes, legacy systems; agent-to-agent protocols (overview)

#### Module 8 · Safe Tool Execution & AI Security *(weeks 16–17)*
- Why `exec()` on model output is a breach waiting to happen: fork bombs, credential theft, disk wipes
- Validating tool calls (schemas, Pydantic, allow-lists) before execution
- Sandboxes: containers vs **gVisor** vs **Firecracker microVMs**; network egress control
- Permission tiers (read vs mutate), idempotency keys, approval thresholds
- OWASP Top 10 for LLM applications; direct vs **indirect** prompt injection (PDFs, emails, web pages)
- Jailbreaks and obfuscation (Base64, many-shot); **canary tokens** for system-prompt leaks
- **Dual-LLM / quarantined-reader** architecture
- Guardrails: Presidio PII redaction, Llama Guard / NeMo Guardrails, deterministic policy layers
- Red-teaming your own system; compliance context (SOC 2, GDPR, EU AI Act)
- 🎮 Injection lab: attack Relay, then defend it layer by layer

### Phase 5: Production

#### Module 9 · LLMOps & Observability *(week 18)*
- Tracing every LLM and tool call: OpenTelemetry GenAI conventions, Langfuse/Phoenix trace trees
- Prompt/config versioning; safe model migrations; LLM gateways (abstraction, keys, budgets, fallbacks)
- Cost, latency and quality dashboards; alerting without alert fatigue
- Incident response and blameless post-mortems for AI features

#### Module 10 · Performance & Cost Optimization *(week 19)*
- **Provider prompt caching** (the biggest safe win) and the silent things that break it
- **Semantic caching** with Redis: thresholds, per-tenant isolation, and when it returns *wrong* answers
- Model routing and cascades; reasoning-effort tuning; batch APIs
- Prompt compression (LLMLingua-style): when it's worth it
- Concurrency with asyncio, queues and background jobs; latency budgets

#### Module 11 · Deployment & Models *(weeks 20–21)*
- Containerizing and deploying AI services; cloud AI platforms (Bedrock, Vertex AI, Azure AI Foundry)
- Provider outages: multi-provider fallback
- Open-weight models with vLLM/Ollama: when self-hosting pays off
- Fine-tuning and distillation: when it beats prompting + RAG (LoRA/SFT)
- Multimodal inputs and voice/realtime agents (overview)

### Phase 6: The field

#### Module 12 · Forward Deployed Engineering *(weeks 22–24)*
- The engagement lifecycle: discovery → POC → pilot → production → expansion
- Discovery: finding the workflow where AI pays off; success metrics agreed **with** the customer
- Data and access audits; working inside VPCs, legacy systems and security reviews
- Scoping and saying no; one-page design docs
- Demos that build trust; pilots that prove ROI; handover
- Interview prep: LLM system design, take-homes, customer role-plays

---

## 5. Elective deep dives

| Elective | What's inside |
|---|---|
| **E1 · GraphRAG & Knowledge Graphs** | Multi-hop reasoning gaps, LLM entity/relation extraction, entity resolution, Text-to-Cypher, vector-seeded graph traversal, community summaries (Leiden) |
| **E2 · LLM Serving Internals** | Why inference is memory-bandwidth bound, the KV cache, PagedAttention (vLLM), continuous batching, quantization (AWQ/FP8), measuring tokens/sec yourself |
| **E3 · Voice & Realtime Agents** | Speech pipelines vs realtime speech models, turn-taking, latency budgets, telephony integration |

## 6. System-design case studies

Each case study takes a **hard, real-world-scale system** and breaks it down with full architecture diagrams, the request pipeline end to end, the key design decisions and their trade-offs, failure modes, and "how would you build a smaller version?"

| # | Case study | Why it's worth studying |
|---|---|---|
| **C1** | [**Claude Code: anatomy of an agentic coding tool**](/case-studies/claude-code/) | The agent loop, tools, context engineering without a vector index, compaction, subagents, permissions, hooks, MCP, and skills: a production agent harness end to end |
| **C2** | **A deep-research answer engine** | Query planning, parallel web search/fetch, source ranking, citation-grounded synthesis, cost control on fan-out, freshness and abuse at scale |
| **C3** | **A multi-tenant enterprise support copilot** (an FDE deployment) | Tenant isolation, permission-aware RAG over customer systems, MCP connectors, approval workflows, per-customer evals, and rollout inside a customer VPC |

## 7. Capstone projects

| # | Project | Proves |
|---|---|---|
| 1 | **Enterprise knowledge assistant**: messy docs, permissions, citations, evals | RAG, evals, UX |
| 2 | **Operations agent** using MCP against mock CRM/ticketing systems, with approvals and durability | Agents, MCP, HITL |
| 3 | **Eval & observability platform** for projects 1–2 | Evals, LLMOps |
| 4 | **FDE simulation**: customer brief → discovery doc → shipped pilot → ROI report + post-mortem | End-to-end FDE |

Every capstone ships with a public URL, an eval report, and a **post-mortem of what failed**.

---

## Build status

| Part | Status |
|---|---|
| Module 0 · Start Here | ✅ Ready |
| Module 1 · LLM Foundations | ✅ Ready |
| Module 2 · AI-Native UX | ✅ Ready |
| Module 3 · Embeddings & Vector Search | ✅ Ready |
| Case study C1 · Claude Code | ✅ Ready |
| Modules 4–12, electives, C2–C3, capstones | 📝 Planned (outlined above) |
