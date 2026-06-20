# Tech Exercise Part 2: Partially Running Exercise — AI Chat Transcript

**Course:** CSCI 4830/8836: Introduction to Software Engineering, Summer 2026
**Instructor:** Dr. Harvey Siy
**Date of conversation:** June 19, 2026

## Tutorial followed

**Series:** Creating an Angular Portfolio Website (YouTube playlist)
**Playlist URL:** https://www.youtube.com/watch?v=PSI4T8SHb0g&list=PLN0Th-4WgKrUVQlqa14mUDeymTW1luznW

Videos used for this exercise:
1. *01: Course Introduction* — overview of the portfolio site to be built and the concepts covered in the series
2. *02: Setting up the Environment* — installing the tools and frameworks needed for development
3. *03: Creating the Project* — scaffolding the initial project and reviewing the generated project files

## How this tool was used

Claude (Anthropic) was used alongside the YouTube Angular tutorial to clarify differences between the tutorial's Angular 15 baseline and the current Angular 22 release, confirm that Server-Side Rendering/Static Site Generation was unnecessary for this exercise, debug a signal-interpolation rendering issue in the title display, and decide on conventional commit message types (`chore` vs. `feat` vs. `fix`) for each step of the setup. The full exchange is below.

---

### Q: I noticed the tutorial uses Angular 15 but angular.dev currently shows version 22. What should I expect to be different?

**A:** Four main differences to expect:

1. **Standalone components are now the default.** `ng new` no longer generates an `AppModule`. The root component imports what it needs directly. If the tutorial shows an `AppModule` and yours doesn't have one, that's expected, not an error.
2. **New control flow syntax exists.** `@if`, `@for`, `@switch` block syntax has been available since v17, alongside the older `*ngIf` / `*ngFor` structural directives. Both still work; just stay consistent with whichever the tutorial uses.
3. **`ng new` prompts differ slightly**, including a new SSR/SSG prompt that didn't exist in v15 (see below).
4. File structure is slightly leaner in some CLI configurations (e.g., fewer auto-generated test files in some setups).

None of this should block the exercise. For a "prove the framework works" assignment, the standalone-component default actually simplifies things compared to what the tutorial shows.

---

### Q: During `ng new`, I was prompted: "Do you want to enable Server-Side Rendering (SSR) and Static Site Generation?" This wasn't in the tutorial. What do I pick?

**A: No** (the default — just hit Enter, or type `N`).

SSR/SSG adds a server build target and rendering pipeline meant for production apps that care about SEO and initial load performance. It's not relevant to a simple hardcoded-data demo page and would add files/complexity not covered in the tutorial. It can be added later via `ng add @angular/ssr` if a future assignment ever needs it.

---

### Q: What's a good first git commit message after running `ng new`?

**A:** `chore: initial Angular project scaffold via ng new`

Reasoning: nothing authored yet, just generated tooling, so `chore` (not `feat`) is accurate if using conventional commit prefixes. Plain `Initial commit from ng new` works fine too if the class doesn't require that convention.

---

### Q: The tutorial had me remove the default content in `app.html` and replace it with Hello World. What commit message should I use?

**A:** `feat: replace default template with Hello World`

Reasoning: this is new authored content, not a fix, so `feat` fits the conventional commit pattern.

---

### Q: Hello World was then replaced with `{{title}}`, but the page shows `[Signal (title): AngularPortfolioWebsite]` instead of just the title. Why?

**A:** Current Angular's default scaffold declares `title` as a **signal**, e.g.:

```typescript
title = signal('AngularPortfolioWebsite');
```

A signal is a wrapper object, not the raw value. Interpolating it directly:

```html
{{title}}
```

renders the signal's debug string representation rather than unwrapping it.

**Fix:** call it like a function in the template to read its current value:

```html
{{title()}}
```

This is another v15-vs-current gap: in v15, `title` was a plain string property and `{{title}}` alone worked fine.

---

### Q: Would changing `{{title}}` to `{{title()}}` count as a `feat` commit?

**A:** Initially flagged as borderline-`fix` (correcting broken behavior). **Revised once clarified that `{{title}}` was never pushed/committed** — since there's nothing in the history to "fix," and this is the first committed version of the title display, it's accurately a `feat`.

Final commit message used: `feat: display title via signal interpolation`

---

## Git commit log summary

| Step | Commit message | Type rationale |
|---|---|---|
| After `ng new` | `chore: initial Angular project scaffold via ng new` | Tooling/setup, no authored content yet |
| Replaced default template with Hello World | `feat: replace default template with Hello World` | New content added |
| Replaced Hello World with `{{title()}}` | `feat: display title via signal interpolation` | New content/behavior added; broken `{{title}}` version was never committed, so this is `feat`, not `fix` |

---

*End of transcript.*
