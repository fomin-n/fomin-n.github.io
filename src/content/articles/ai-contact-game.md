---
title: "AI Contact Game"
description: "What happens when you put language models in charge of a word-guessing party game? An experiment with LLMs playing Contact."
date: 2026-05-14
author: "Nikita Fomin"
tags: ["llm", "ai", "games", "experiments"]
source: "https://www.linkedin.com/pulse/ai-contact-game-nikita-fomin-jzqqe/"
---

*Originally published on [LinkedIn](https://www.linkedin.com/pulse/ai-contact-game-nikita-fomin-jzqqe/).*

![AI Contact Game cover](/images/cover.png)

---

Have you ever played the word game "Contact"? In Russian, it is known as "Есть контакт". I'm not sure whether people play it in other languages. There isn't even a Wikipedia article about it in English. Anyway, here are the rules.

## Rules

You need at least three players. One player is the **Word Master**. They secretly choose a Secret Word and reveal only the first letter. For example:

> "A.."

The other players now try to describe some other word that starts with the same letter, without letting the Word Master understand it first. For example, one player might say:

> "Who was Hugo Weaving in The Matrix?"

If another player thinks they understood the clue, they say:

> "Contact!"

Then, on the count of three, both players must say the same word:

> "Agent"

If they say different words, or if the Word Master guesses the word first, the attempt is blocked.

But if the contact succeeds, the Word Master must reveal the next letter of the Secret Word. For example:

> "Ap…"

Now the players need to communicate words that start with "Ap". The game continues like this until someone guesses the Secret Word. You also cannot reuse words.

## Project

Recently I remembered this game and built a small project where LLMs play this game with each other.

**Repo:** [fomin-n/ai-contact-game](https://github.com/fomin-n/ai-contact-game)

It looks like this:

![Game UI schema](/images/schema.png)

![AI vs AI gameplay](/images/aivsai.gif)

You can configure the game directly from the UI: choose the language, select the game mode, optionally set the Secret Word, and define personalities for Player A and Player B. You can also choose which AI model controls each role.

There is a difference from the human version. In the real game, the Word Master might simply fail to react fast enough. In my LLM version, I always give the Word Master a chance to guess and block the contact before the round continues.

You can also choose the secret word yourself and try to stop the models from guessing it.

![Playing as Word Master](/images/wordmaster.gif)

Or play as one of the players and try to guess the word together with another model.

![Playing as a guesser](/images/player.gif)

---

Thanks for your attention.

*P.S. I have chosen a secret word. The first letter is:*

**"B…"**
