---
title: "nutrition-agent: A Calorie-Estimating Telegram Bot with Models on a Leash"
description: "A pet project that turns a meal description or food photo into a calorie and macro estimate, using a fixed LangGraph state machine that scopes the models to classification and structuring while keeping the math deterministic."
date: 2026-07-06
author: "Nikita Fomin"
tags: ["llm", "ai", "agents", "langgraph", "nutrition"]
---

![nutrition-agent cover](/images/nutrition-agent/cover.png)

---

I've been building **nutrition-agent** as a pet project: a Telegram bot that turns a meal description or a single food photo into a calorie and macro estimate with explicit assumptions. Open source (MIT), single-maintainer, deliberately small.

You can try it here: https://t.me/nutrition_agentic_bot

## A fixed graph with agentic parts

Models handle the uncertain input. Deterministic Python handles everything that must be correct.

Food input is messy ("two slices of pizza and some salad"), but the required output is arithmetic over nutrition data, and arithmetic is not something I want a language model improvising. So the core is a LangGraph state machine: a fixed graph with typed state. The agentic part is real but scoped to classification, routing, and structuring. Retrieval ranking, macro math, answer formatting, rate limiting, and auth stay deterministic.

## Where the models actually are

![Figure 1. Request graph](/images/nutrition-agent/fig1.png)

*Figure 1. Request graph. Orange nodes may call a model, green nodes are deterministic, purple is SQLite memory.*

Seven nodes can use an LLM: input and output moderation, a scope classifier, the text meal parser, food-photo recognition, packaging/OCR, and a critic. Each falls back to deterministic behavior when models are disabled or unavailable, so the bot degrades instead of failing.

Three mechanisms keep the models on a leash:

1. **Schemas everywhere.** Any model output that affects routing or calculation inputs is parsed through Pydantic. Malformed parses go through a bounded validate-and-repair step instead of free-text salvage.
2. **A capped critic loop.** The critic-synthesize-critic cycle has an iteration limit and can only revise answer formatting. It cannot reparse food or recompute nutrition values.
3. **Confidence-based vision escalation.** Photos go to a cheap vision model first. One bounded retry with a stronger model fires only on low confidence, so hard images get a second look without making every photo expensive.

User text, OCR output, image observations, and provider data are all treated as untrusted data, never as instructions.

![Figure 2. One request end to end](/images/nutrition-agent/fig2.png)

*Figure 2. One request end to end. Memory is SQLite scoped by (user, conversation), so a follow-up like "100 g, fried" resolves against the earlier question without leaking across chats.*

## Data sources

Retrieval is estimate-first but conservative:

- **USDA FoodData Central** for generic ingredients
- **FatSecret** and branded records for packaged and restaurant items
- **Open Food Facts** as a packaged-food fallback

Genuinely ambiguous input becomes a clarification question, not a guess.

## The engineering around the models

The stack is deliberately boring: Python 3.11+, LangGraph, python-telegram-bot, Pydantic v2, SQLite, uv. GitHub Actions runs ruff, mypy, the pytest suite, and the deterministic golden lane as a hard merge gate, with a 100% requirement on safety and refusal cases.

Hardening for public traffic:

- private-chat-only handling and persistent bans
- per-minute burst caps, daily photo and request caps
- bounded update concurrency with a per-user in-flight limit, so one heavy user cannot block the queue for everyone else

For monitoring I run **Phoenix**. Every request produces a root span, with LangGraph, LangChain, and provider spans attached underneath, which makes slow or failing steps visible per request.

## How quality is measured

One headline metric: pass rate on a 111-case golden regression set (English and Russian). Each case specifies the expected behavior (estimate, clarify, or refuse), required and forbidden phrases, and an acceptable calorie range. A case passes only if all three hold. Mean calorie error is tracked as a secondary metric. The set runs in four lanes, from a fully deterministic fallback to live end-to-end with real providers, and every report is committed to the repo, so each change maps to a measured delta.

Improvements came from decomposing the gap by mechanism rather than swapping in a bigger model: a deterministic arbitration layer over ranked provider candidates, plus parser work on composite dishes (dish priors, total-weight allocation, vocabulary, and the validate-and-repair step). Each change was a single-purpose commit, measured before and after.

![Figure 3. Golden-set pass rate for the live end-to-end lane](/images/nutrition-agent/fig3.png)

*Figure 3. Golden-set pass rate for the live end-to-end lane. Each point is one committed eval run.*

## Limitations

Portion estimation from photos stays approximate even with escalation. Hidden oils, sauces, and mixed dishes are hard. Packaged-food data is uneven. The bot returns ranges and states its assumptions rather than pretending precision.

## Links

- **Telegram bot:** https://t.me/nutrition_agentic_bot
- **Repo:** https://github.com/fomin-n/nutrition-agent
