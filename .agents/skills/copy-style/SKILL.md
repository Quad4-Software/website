---
name: copy-style
description: Prose rules for quad4.io. Use when writing or editing any user-facing text, docs, comments, or commit messages in this repo.
---

# Copy style

Enforced by `tests/copy.test.ts` against `tests/slop.data.ts`. The lint scans
every file in `src/` plus `index.html`.

## Banned

- AI vocabulary: delve, tapestry, testament, underscore, showcase, realm,
  meticulous, multifaceted, robust, seamless, effortless, holistic,
  leverage, utilize, empower, unlock, unleash, supercharge, streamline,
  elevate, foster, embark, garner, bolster, journey, landscape, navigate,
  vibrant, pivotal, paramount, comprehensive, moreover, furthermore,
  incredibly, genuinely, plethora, myriad, nestled, blazingly, mind-blowing,
  game-changing, revolutionary, innovative, cutting-edge, state-of-the-art,
  groundbreaking, world-class, best-in-class, enterprise-grade,
  production-ready, end-to-end, ever-evolving.
- Formulaic phrases: "in today's", "whether you're", "look no further",
  "the future of", "say goodbye/hello to", "trusted by", "worth noting",
  "here's the thing", "the best part", "what if I told you",
  "imagine a world", "sound familiar", "are you ready", "ready to transform",
  "most people don't", "Meet:/Enter: intros", "changes everything",
  "thrilled/excited/proud to announce", "in conclusion", "long story short",
  "paradigm shift", "low-hanging fruit", "commitment to excellence",
  "at its core", "at the end of the day", "when it comes to",
  "designed to help you", "deep dive", "dive into", "all-in-one",
  "a wide/vast array of", "treasure trove", "hidden gem", "one-stop",
  "hassle-free", "peace of mind", "to the next level", "unlock the power of",
  "it's not just".
- Structural tells: em/en dashes, curly quotes, unicode arrows, emoji,
  exclamation marks, "No X. No Y. Just Z.", participial tack-ons like
  ", highlighting", negative parallelism "It's not X, it's Y".

## Required

- Plain ASCII. Periods and commas over dashes. Short sentences.
- Concrete claims only. If it cannot be measured or verified, do not say it.
- Normie-friendly. No acronym soup, no WASM/ONNX/TUI jargon in user copy.
  Product names (Reticulum, LXMF, NomadNet, rngit) are fine.
- No semicolons in prose.

## Adding a rule

Append to `WORDS`, `PHRASES` or `BANNED_STRUCTURES` in `tests/slop.data.ts`.
Keep word rules to prose-only terms that cannot collide with code
identifiers.
