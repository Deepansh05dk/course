---
title: "The roles: FDE vs Applied AI vs GenAI Engineer"
description: What each role does, how they overlap, and which one to target first.
sidebar:
  order: 1
---

Three job titles come up again and again in 2026 hiring. They share about 70% of their skills and differ in **where you spend your time**.

## Forward Deployed Engineer (FDE)

An engineer who **sits with the customer** and makes the AI product work in *their* environment, with their data, systems, security rules, and workflows.

- **Day to day:** discovery calls, reading the customer's messy data, writing integration code, building a pilot, deploying it inside their cloud, debugging it in production, and reporting results.
- **What makes it different:** you own the deployment end to end, from discovery through system design, implementation, evaluation, and production rollout. Communication carries as much weight as code.
- **Who hires:** model labs (OpenAI, Anthropic), AI-native startups, data/AI platforms (Palantir started the title), consultancies, and defense-tech companies.
- **Demand signal:** one analysis counted FDE and FDE-adjacent postings going from about 640 (April 2025) to about 5,300 (April 2026). Treat the exact numbers loosely, but the trend is real.

## Applied AI Engineer

An engineer who **builds AI features into a product** and is accountable for their quality in production.

- **Day to day:** designing the LLM pipeline, writing evals, running error analysis on traces, tuning prompts and context, choosing models, and keeping costs and latency in check.
- **What makes it different:** depth on *reliability*. The common framing in 2026 is that the job is "reliability engineering around models, not model building."

## Generative AI (GenAI) Engineer

The title enterprises and consultancies use most. Postings lean toward **building blocks**: RAG pipelines, vector databases, agent frameworks, MCP servers, and cloud AI platforms (Azure AI Foundry, Bedrock, Vertex).

- **Day to day:** document ingestion and retrieval systems, agent workflows, integration with enterprise systems, and sometimes fine-tuning (LoRA/QLoRA).
- **What makes it different:** more emphasis on specific tools and platforms, and sometimes more ML depth.

## Side by side

| | FDE | Applied AI Eng. | GenAI Eng. |
|---|---|---|---|
| Main stakeholder | The customer | The product team / users | Internal business units / clients |
| Core output | A working deployment that proves value | A reliable AI feature | AI pipelines and platforms |
| Weighted skills | Integration, debugging in the field, communication, scoping | Evals, context engineering, observability, cost | RAG, agents, MCP, cloud AI platforms |
| Travel / customer-facing | High | Low | Medium |
| Typical experience asked | ~3–6 yrs (but strong portfolios get in earlier) | 2–5 yrs | 3–5 yrs, with 1–2 in GenAI |

## Which should you target first?

With your profile (frontend plus FastAPI, ~2 years), **Applied AI Engineer is the fastest entry point**, and it is also the base the other two build on:

1. Your frontend skill is a real edge: many AI engineers can build the pipeline but ship poor UX.
2. Your FastAPI skill covers the backend half of most AI products.
3. What's missing is mainly **LLM-specific engineering**: evals, retrieval, agents, observability. That's Modules 1–10.

Then **FDE** is the natural next step. Module 11 and the capstones add the customer-facing, end-to-end ownership that FDE interviews test for. Experience bars for FDE are often higher, so a portfolio of *deployed* projects with honest post-mortems matters more than certificates.

:::note[What none of these roles usually need]
Training models from scratch, deep maths, or research. Fine-tuning shows up in some postings, but the consistent advice is that prompting plus retrieval solves most production problems more cheaply. We cover fine-tuning as a "know when to use it" topic in Module 10.
:::
