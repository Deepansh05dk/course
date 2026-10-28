---
title: Dev environment setup
description: The Python project layout, tools, and API-key hygiene used in every lab.
sidebar:
  order: 3
---

Every lab in this course uses the same skeleton, so you set it up once.

## Tools

| Tool | Why |
|---|---|
| **Python 3.12+** | The language of most AI backends |
| **[uv](https://docs.astral.sh/uv/)** | Fast package and venv manager; it replaces pip, venv and pip-tools |
| **FastAPI + Uvicorn** | You already know it; it's our API layer |
| **Docker** | Postgres/pgvector, Langfuse and deployment later on |
| **An LLM API key** | The examples use the Anthropic SDK; the concepts transfer to any provider |

## Create the lab project

```bash
uv init ai-labs && cd ai-labs
```

```bash
uv add fastapi "uvicorn[standard]" anthropic pydantic pydantic-settings httpx
```

```bash
uv add --dev pytest pytest-asyncio ruff
```

Suggested layout:

```text
ai-labs/
├── app/
│   ├── main.py          # FastAPI app
│   ├── config.py        # settings from env
│   ├── llm.py           # the ONE place that talks to the model provider
│   └── routes/
├── evals/               # datasets + eval scripts (from Module 1 onward)
├── tests/
├── .env                 # never committed
└── pyproject.toml
```

:::tip[Put the provider behind one module]
Keep every provider call in `app/llm.py`. When you later add tracing (Module 7), caching (Module 8), or a second provider, you change one file instead of thirty.
:::

## Secrets

```python
# app/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    anthropic_api_key: str
    model: str = "claude-opus-5-5"
    request_timeout_s: float = 60.0


settings = Settings()
```

```bash
# .env  (add .env to .gitignore before your first commit)
ANTHROPIC_API_KEY=sk-ant-...
```

Rules that will save you in an FDE engagement:

- Never paste keys into code, notebooks, screenshots, or chat.
- Use one key per environment (dev/staging/prod) and per project, so you can revoke one without breaking the others.
- Set spend limits in the provider console from day one.

## Smoke test

```python
# smoke.py
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from the environment
msg = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1000,
    messages=[{"role": "user", "content": "Say hello in five words."}],
)
# The response is a list of content blocks (it can include "thinking" blocks),
# so pick out the text ones instead of assuming content[0] is text.
print("".join(b.text for b in msg.content if b.type == "text"))
print(msg.usage)
```

```bash
uv run --env-file .env python smoke.py
```

If you see a greeting and a `usage` object with `input_tokens` and `output_tokens`, you're ready for [Module 1](/foundations/how-llms-work/).
