---
title: "Rubik's 2×2 Camera Solver"
description: "A local camera-guided app that scans a physical 2×2 Rubik's Cube, finds a shortest solution, and guides every turn."
date: 2026-07-23
author: "Nikita Fomin"
tags: ["computer-vision", "rubiks-cube", "solver"]
---

I built a camera-guided solver for physical 2×2 Rubik's Cubes. Scan five faces with your phone or laptop camera; the app reconstructs the hidden face, validates the cube, finds a shortest solution, and guides you through every turn with visual overlays. Everything runs locally, and camera images are not stored.

**Repo:** [fomin-n/rubicks-solver](https://github.com/fomin-n/rubicks-solver)

<video class="article-demo" autoplay muted loop playsinline controls preload="metadata" aria-label="Demo of the Rubik's 2×2 Camera Solver">
  <source src="/images/rubicks-solver/demo.mp4" type="video/mp4">
  Your browser does not support embedded video. <a href="https://github.com/fomin-n/rubicks-solver/blob/master/docs/assets/rubick-solver-demo.mp4">Watch the demo on GitHub</a>.
</video>
