---
title: "AI Contact Game"
description: "What happens when you put language models in charge of a word-guessing party game? An experiment with LLMs playing Contact."
date: 2026-05-14
author: "Nikita Fomin"
tags: ["llm", "ai", "games", "experiments"]
source: "https://www.linkedin.com/pulse/ai-contact-game-nikita-fomin-jzqqe/"
---

*Originally published on [LinkedIn](https://www.linkedin.com/pulse/ai-contact-game-nikita-fomin-jzqqe/).*

---

## The Game

Contact is a word game where one player — the *Word Master* — secretly picks a word and reveals only its first letter. Everyone else tries to stump the Word Master by describing other words that start with that same letter, without making the clue too obvious.

When two guessers think they've landed on the same word from a clue, they shout **"Contact!"** and count down from three. If they say the same word simultaneously, the Word Master is forced to reveal the next letter. The loop continues until someone finally guesses the secret word outright. No word can ever be reused.

It's a game about language, lateral thinking, and the small gap between what you mean and what you say.

---

## The LLM Version

I recently built a project where language models play Contact with each other.

The implementation lets you configure the game through a UI: choose the language, game mode, the secret word, and assign personalities to each player. You can pick which AI model controls each role — Word Master, guesser, or both.

One deliberate design choice I made differs from how humans play: **I always give the Word Master a chance to guess and block the contact before the round continues.** This keeps the game fair against models that might otherwise be too quick.

You can also step into the game yourself — set your own secret word, act as the Word Master trying to stop the models, or join as a fellow guesser alongside an AI teammate.

The project is on GitHub: [fomin-n/ai-contact-game](https://github.com/fomin-n/ai-contact-game)

---

## What's Next

My chosen secret word starts with **B…**
