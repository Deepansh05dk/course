---
title: "Research: roles & skills (2026)"
description: The skills that 2026 postings and roadmaps ask for, and where each is taught in this course.
---

This page summarizes the research behind the curriculum (October 2026). Most sources are job postings, career blogs and vendor roadmaps, so treat specific numbers as directional rather than as statistics.

## What the market is saying

1. **Python is the baseline.** In one analysis of about 5,400 FDE and FDE-adjacent roles, Python was the most-mentioned technical skill.
2. **Evals are the highest-leverage and most-skipped skill.** Roadmaps put evaluation *early*, and AI FDE roles mention "building evaluation harnesses to prove output quality."
3. **RAG is expected end to end:** ingestion, chunking, embeddings, vector storage, hybrid search, re-ranking, synthesis, plus "agentic RAG" and multi-hop retrieval.
4. **MCP is now a named requirement.** Postings ask for custom MCP servers built with the official Python/TypeScript SDKs to expose internal databases, APIs and file systems to agents. MCP was donated to the Agentic AI Foundation in December 2025 and is supported by all the major providers.
5. **Agents and orchestration:** LangGraph, PydanticAI, CrewAI and the provider agent SDKs, with tool calling, error handling, human approval, and durable execution.
6. **Observability:** instrument every LLM call (Langfuse, LangSmith, OpenTelemetry), and track cost, latency and quality.
7. **The emphasis has shifted from prompt engineering to context engineering to harness engineering.** The model is rarely the bottleneck. What limits quality is what's in context and how the runtime (loop, tools, memory, guardrails, retries, budgets) is built.
8. **Production concerns:** caching, streaming, cost control, guardrails, security (prompt injection), and deployment on cloud AI platforms.
9. **For FDEs:** "build something, connect it to messy real-world systems, deploy it, and fix it when it breaks in a customer's environment", plus clear communication and good judgment.
10. **Optional or rarer:** fine-tuning (LoRA/QLoRA/SFT), RLHF, self-hosting models.

## Skills → modules

| Skill | Weight in postings | Where you learn it |
|---|---|---|
| LLM API fluency (multiple providers), streaming, structured output | Baseline | Module 1 |
| Context/prompt engineering, caching | High | Modules 1, 8 |
| AI product UX (streaming, citations, HITL) | Differentiator | Module 2 |
| RAG + vector DBs + hybrid search + reranking | High (GenAI) | Module 3 |
| Tool calling, agents, frameworks, durable execution | High | Module 4 |
| MCP servers and enterprise integration | High and rising | Module 5 |
| Evals, LLM-as-judge, error analysis, CI gates | Highest leverage | Module 6, and in every lab |
| Observability, gateways, versioning | High | Module 7 |
| Cost and latency optimization | High | Module 8 |
| Security: prompt injection, guardrails, PII | High (enterprise) | Module 9 |
| Docker, cloud deploy, Bedrock/Vertex/Azure, open-weight models | Medium–High | Module 10 |
| Fine-tuning | Low–Medium (optional) | Module 10 |
| Discovery, scoping, customer communication | Essential for FDE | Module 11 |

## How to show these skills (what hiring managers look for)

- **Two or three deployed projects** with real URLs, each with a write-up covering *what failed and how you measured it*, rather than a list of certificates.
- Eval results in the README ("faithfulness went from 0.71 to 0.89 after adding reranking").
- Traces and dashboards (screenshots are fine).
- For FDE roles: a design doc and an ROI note from your simulated engagement (Capstone 4).

## Sources

- [Forward Deployed Engineer Skills: What AI Companies Actually Hire For in 2026 (InterviewBit)](https://www.interviewbit.com/varsity/blog/?p=295)
- [Forward Deployed Engineer qualifications (InterviewBit)](https://www.interviewbit.com/varsity/blog/?p=811)
- [7 Steps to Become a Forward Deployed Engineer in 2026 (KDnuggets)](https://www.kdnuggets.com/7-steps-to-become-a-forward-deployed-engineer-in-2026)
- [AI Forward Deployed Engineer: Key Skills (Second Talent)](https://www.secondtalent.com/occupations/ai-forward-deployed-engineer/)
- [The GenAI Engineer Roadmap for 2026 (InterviewBit)](https://www.interviewbit.com/varsity/blog/?p=132)
- [Software Engineer to AI Engineer: Complete Roadmap for 2026 (codebasics)](https://codebasics.io/blog/software-engineer-to-ai-engineer-complete-roadmap-for-2026)
- [How to Become an AI Agent Engineer in 2026 (SkillScouter)](https://skillscouter.com/how-to-become-an-ai-agent-engineer/)
- [AI engineer roadmap 2026 (Let's Data Science)](https://letsdatascience.com/blog/ai-engineer-roadmap-2026-skills-tools-and-career-path)
- [Deloitte: Senior Consultant, Generative AI (job posting)](https://southasiacareers.deloitte.com/job/Pune-Senior-Consultant-Generative-AI-Pune-Engineering/55532144/)
- [DXC: Generative AI Engineer (job posting)](https://careers.dxc.com/es/job-es/23418851/)
- [Siemens: GenAI engineering role (job posting)](https://jobs.siemens.com/es_ES/externaljobs/JobDetail/505185)
- [Harness engineering (Future AGI)](https://futureagi.com/blog/harness-engineering/)
- [Harness engineering: the complete guide (DataNorth)](https://datanorth.ai/blog/harness-engineering-the-complete-guide-to-ai-agent-scaffolding)
- [Agent Harness Engineering: The Rise of the AI Control Plane (Medium)](https://medium.com/@adnanmasood/agent-harness-engineering-the-rise-of-the-ai-control-plane-938ead884b1d)
- [AI agent trends 2026 (Salesforce)](https://www.salesforce.com/blog/ai-agent-trends-2026/)
