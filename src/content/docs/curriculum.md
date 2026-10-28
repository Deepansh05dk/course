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
1. [Do you even need RAG?](/rag/do-you-need-rag/): the pipeline end to end; long context + caching vs RAG vs search vs tools vs fine-tuning
2. [Ingestion: garbage in, garbage out](/rag/ingestion/): PDFs, tables, scans, metadata, incremental sync **with deletions**, freshness
3. [Chunking](/rag/chunking/): fixed vs recursive vs structure-aware (live playground), prepended context, contextual retrieval, parent-document retrieval
4. [Hybrid search and measuring retrieval](/rag/hybrid-search/): BM25, Reciprocal Rank Fusion (live playground), Postgres SQL, recall@k and MRR
5. [Reranking and query transformations](/rag/reranking-and-query-transforms/): cross-encoders, conversational rewriting, HyDE, multi-query
6. [Grounded generation with citations](/rag/grounded-generation/): native API citations, refusing before generating, conflicting versions
7. [Permission-aware retrieval](/rag/permission-aware-retrieval/): ACL sync, row-level security that fails closed, leakage paths
8. [Agentic and multi-hop RAG](/rag/agentic-rag/): retrieval as a tool, budgets, routing, and the Module 4 lab

### Phase 3: Quality

#### Module 5 · Evals & CI Regression Testing *(weeks 10–11)*: moved earlier so everything after it gets measured
1. [Why evals are the core skill](/evals/why-evals/): properties not strings, the eval pyramid, the eval-driven loop
2. [Error analysis first](/evals/error-analysis/): open and axial coding, failure taxonomies, a hands-on trace-labelling exercise
3. [Building eval datasets](/evals/datasets/): production samples, dimension-based synthetic data, splits, versioning, leakage
4. [Code checks and LLM-as-judge](/evals/llm-as-judge/): deterministic scorers, binary rubrics, critique-before-verdict, judge biases
5. [Calibrating your judge](/evals/judge-calibration/): TPR/TNR against human labels, corrected pass rates (live calculator)
6. [Evaluating RAG and agents](/evals/rag-and-agent-evals/): the RAG triad, outcome vs trajectory evals, sandbox end-state checks
7. [Evals in CI](/evals/evals-in-ci/): critical vs quality cases, noise and bootstrap intervals, promptfoo, the tool landscape
8. [Online evals and monitoring](/evals/online-evals/): guardrails vs monitors, drift, shadow mode, A/B tests, and the Module 5 lab

### Phase 4: Agents

#### Module 6 · Tools, Workflows & Agents *(weeks 12–14)*
1. [Tool calling from first principles](/agents/tool-calling-from-scratch/): the loop by hand, parallel calls, error results, stop reasons, circuit breakers (tested)
2. [Workflows vs agents](/agents/workflows-vs-agents/): the checklist, plus chaining, routing, parallelization, orchestrator–workers, evaluator–optimizer
3. [Harness engineering](/agents/harness-engineering/): tool design, context management and compaction (cost simulator), budgets, verification
4. [Memory](/agents/memory/): working, session and long-term memory; extraction with filters; privacy and memory poisoning
5. [Durable agents and human approval](/agents/durable-agents/): checkpoints, idempotent side effects, durable waits, re-validation
6. [Stateful agent graphs with LangGraph](/agents/langgraph/): typed state, conditional edges, `interrupt` approvals that survive restarts (tested across processes)
7. [Frameworks and multi-agent systems](/agents/frameworks-and-multi-agent/): choosing a framework, when multiple agents help, and the Module 6 lab

#### Module 7 · MCP & Enterprise Integrations *(week 15)*
1. [What MCP is, and why it won](/mcp/what-is-mcp/): hosts, clients, servers; tools, resources, prompts; transports; the wire protocol
2. [Build an MCP server in Python](/mcp/build-mcp-server/): the official SDK v2 (`MCPServer`), structured outputs, errors, in-process tests, stdio and HTTP
3. [Designing tools for models](/mcp/tool-design/): task-shaped tools, descriptions, bounded outputs, errors that teach, tool evals
4. [Remote MCP servers and authentication](/mcp/remote-and-auth/): OAuth resource servers, discovery, audience-bound tokens, per-user authorization, no token passthrough
5. [Consuming MCP from your agents](/mcp/consuming-mcp/): a Python bridge, the Claude API MCP connector, the AI SDK MCP client, host-side policy
6. [MCP security and enterprise integration](/mcp/security-and-enterprise/): tool poisoning, rug pulls, cross-server exfiltration, legacy systems, A2A, and the Module 7 lab

#### Module 8 · Safe Tool Execution & AI Security *(weeks 16–17)*
1. [The AI threat model](/security/threat-model/): trust boundaries, the lethal trifecta, the OWASP Top 10 for LLM applications (2025), threat modelling in 20 minutes
2. [Prompt injection and jailbreaks](/security/prompt-injection/): direct vs indirect, obfuscation, spotlighting, streaming-safe canary tokens (tested), and the 🎮 injection lab
3. [Validating tool calls](/security/validating-tool-calls/): a deterministic policy layer with Pydantic, allow-lists, ownership from the session, caps, approvals (tested)
4. [Sandboxing model-generated code](/security/sandboxing/): process limits (tested, and what they miss), containers, gVisor, Firecracker microVMs, egress control
5. [The dual-LLM pattern](/security/dual-llm/): quarantined readers, constrained outputs, opaque references, data-flow rules (tested)
6. [Guardrails and PII](/security/guardrails/): Presidio redaction (tested, with its misses), Llama Guard, NeMo Guardrails, latency and false positives
7. [Red-teaming and compliance](/security/red-teaming-and-compliance/): promptfoo, garak, PyRIT, attack regression suites; SOC 2, GDPR, the EU AI Act; and the Module 8 lab

### Phase 5: Production

#### Module 9 · LLMOps & Observability *(week 18)*
1. [Tracing LLM and agent calls](/llmops/tracing/): OpenTelemetry GenAI conventions, instrumenting model and tool calls (tested), an interactive trace viewer, what not to capture
2. [Versioned AI config and safe model migrations](/llmops/versioning-and-migrations/): the AI config as the release unit, pinning, deprecations, the migration playbook
3. [LLM gateways](/llmops/llm-gateway/): keys, budgets, retries, circuit breakers and fallback (tested), build vs buy
4. [Dashboards and alerting](/llmops/dashboards-and-alerting/): AI signals, SLOs and burn-rate alerts, and the 🎮 alert tuner
5. [Incident response for AI features](/llmops/incident-response/): kill switches, runbooks, blast-radius queries, blameless post-mortems, and the Module 9 lab

#### Module 10 · Performance & Cost Optimization *(week 19)*
1. [Prompt caching](/performance/prompt-caching/): the prefix match, breakpoints and TTLs, economics, silent cache breakers, a prefix auditor (tested), and the 🧊 cache lab
2. [Semantic caching](/performance/semantic-caching/): why similarity isn't equivalence (tested, with failures), tenant and entity scoping, exact-match caching, and the 🎯 threshold tuner
3. [Model routing, cascades, effort and batch](/performance/routing-and-cascades/): the lever order, routers vs cascades (simulated), the cascade calculator, the Batch API
4. [Putting prompts on a token diet](/performance/token-diet/): trimming tool results (tested), output tokens, prompt compression, cutting with evals
5. [Concurrency, queues and latency budgets](/performance/concurrency-and-latency/): bounded async concurrency (tested), separating background work, latency budgets, and the Module 10 lab

#### Module 11 · Deployment & Models *(weeks 20–21)*
1. [Deploying AI services](/deployment/deploying-ai-services/): streaming through proxies, timeouts, disconnects (tested), health checks, graceful shutdown, scaling on concurrency
2. [Cloud AI platforms and multi-provider fallback](/deployment/cloud-platforms/): Bedrock, Vertex AI and Foundry, what differs, one client factory (tested), same-model fallback
3. [Open-weight models and self-hosting](/deployment/open-weight-models/): vLLM and Ollama, what you take on, a break-even calculator, hybrid designs
4. [Fine-tuning and distillation](/deployment/fine-tuning/): when to tune, SFT/LoRA/preference tuning/distillation, a leakage checker (tested), honest evaluation
5. [Multimodal inputs and voice agents](/deployment/multimodal-and-voice/): image cost and preparation (tested), PDFs, voice pipelines, and the Module 11 lab

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
| Module 4 · Production RAG | ✅ Ready |
| Module 5 · Evals & CI | ✅ Ready |
| Module 6 · Tools, Workflows & Agents | ✅ Ready |
| Module 7 · MCP & Enterprise Integrations | ✅ Ready |
| Module 8 · Safe Tool Execution & AI Security | ✅ Ready |
| Module 9 · LLMOps & Observability | ✅ Ready |
| Module 10 · Performance & Cost Optimization | ✅ Ready |
| Module 11 · Deployment & Models | ✅ Ready |
| Case study C1 · Claude Code | ✅ Ready |
| Module 12, electives, C2–C3, capstones | 📝 Planned (outlined above) |
