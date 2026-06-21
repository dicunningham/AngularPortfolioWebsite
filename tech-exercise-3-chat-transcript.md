# Tech Exercise Part 3: Functioning Application — AI Chat Transcript

**Course:** CSCI 4830/8836: Introduction to Software Engineering, Summer 2026
**Instructor:** Dr. Harvey Siy
**Date of conversation:** June 19, 2026

## Tutorial followed

**Series:** Creating an Angular Portfolio Website (YouTube playlist)
**Playlist URL:** https://www.youtube.com/watch?v=PSI4T8SHb0g&list=PLN0Th-4WgKrUVQlqa14mUDeymTW1luznW

Videos used for this exercise:

1. *04: Adding Bootstrap to our Project* — integrating Bootstrap into the project
2. *05: Building the Site Header* — building out the site header
3. *06: Creating the Navigation Bar* — creating and styling the navigation bar
4. *07: Routing and Navigation in Angular* — making the navigation bar functional by implementing routing
5. *08: Building out the Home Page* — building out the home page
6. *09: Creating the Project Cards* — creating the project card component, the first step in building out the portfolio section
7. *10: Passing Data Between Components* — structuring project data to make it easier to pass between components

## How this tool was used

Claude (Anthropic) was used to think through git branching strategy for continuing work on the AngularPortfolioWebsite repo after submitting Tech Exercise Part 2, and to troubleshoot a git remote authentication issue (HTTPS vs. SSH) when pushing a new branch. The exchange is below.

---

### Q: While waiting for Part 2 to be graded, should I clone or branch the repo so I can work on Part 3 without changing what was submitted? I could also find a newer tutorial and start over.

**A:** You don't need to clone or branch to protect what was submitted. This is one of git's actual strengths: your Part 2 submission is already permanently captured in the commit history at the `master` branch state it was in when you submitted. Even if you keep committing new work directly to `master`, the commit you submitted still exists, identifiable by its commit hash, and grading is typically based on either the latest commit at the time it's checked or the specific commit/timestamp from the submission, not whatever state the repo happens to be in whenever the instructor gets around to it. Continuing to build on `master` is normal and expected, that's what the assignment description itself says: build on the app started in Tech Exercise Part 2.

That said, a branch is still a good idea, but for a different reason than protection. A lightweight snapshot branch gives a clean, permanent reference point for "this is what Part 2 looked like" versus "this is current":

```bash
git checkout -b part-2-submission
git push origin part-2-submission
git checkout master
```

Then continue working on `master` for Part 3 like normal.

On starting over with a new tutorial: not recommended here. Working code, a debugged understanding of the version differences between the tutorial and current Angular, and a documented chat transcript already exist as part of the graded submission. Restarting would mean redoing already-solved setup work for a tutorial that isn't guaranteed to be meaningfully better, on a day with limited time. Building on existing work is both faster and the path the assignment explicitly endorses.

---

### Q: The tutorial shows running `ng add ngx-bootstrap`, but at the time there was no `app.module.ts` to set as a starting point, as some ngx-bootstrap docs assume. I ran `ng add` anyway and got "Found compatible package version: ngx-bootstrap@6.2.0," which seems outdated compared to the current v21.2.0 shown on the package's website.

**A:** Two separate things were happening here.

First, the missing `app.module.ts` isn't a problem, it's expected on a standalone-by-default Angular project. ngx-bootstrap's own documentation supports importing its modules into either a standalone component's `imports` array or a traditional `NgModule`, so running `ng add` without an `AppModule` present doesn't block the install; it just means wiring up individual pieces (e.g., `TooltipModule`, `AccordionModule`) directly into the standalone component instead.

Second, the old version number is a real signal worth noting: there's an open, actively tracked GitHub issue about ngx-bootstrap's compatibility with newer Angular versions, where the current release can currently only be installed by accepting legacy peer dependencies. This suggests `ng add` resolved to the newest version it judged safely compatible with the project's Angular version, landing on v6.2.0 rather than the latest release.

---

### Q: The tutorial itself uses ngx-bootstrap v10.2.0. Does that change anything?

**A:** Yes, favorably. Recent ngx-bootstrap release notes show the library completed a migration to Angular's zoneless change detection, removed zone.js as a dependency, and replaced both `@Input()` and `@Output()` decorators with the newer signal-based `input()`/`output()` function APIs. Since v6.2.0 (the version installed) predates the tutorial's own v10.2.0, it's actually *older* than what the tutorial used, not newer, meaning the decorator-based `@Input()`/`@Output()` API the tutorial demonstrates is likely still intact in v6.2.0, since those breaking signal-based replacements happened in later releases.

**Conclusion:** no action needed preemptively. Proceed with the tutorial as written using the installed version. If a specific component or API referenced by the tutorial doesn't exist in v6.2.0, that's the point to investigate the exact difference, not before.

---

### Q: Bootstrap doesn't appear to be running after restarting `ng serve`. How do I troubleshoot?

**A:** Diagnosed step by step:

- `ng add ngx-bootstrap` had previously failed partway through with a missing schematics module error, likely due to a corrupted `node_modules`. A clean reinstall (`rm -rf node_modules package-lock.json && npm install`) resolved that error.
- The build output showed `styles.css` at only 95 bytes, well below what's expected if Bootstrap's CSS were bundled in, and an unused-imports warning on `app.ts` confirmed no ngx-bootstrap modules were wired in yet.
- Checking `node_modules/bootstrap/package.json` confirmed plain Bootstrap (the CSS framework itself, separate from `ngx-bootstrap`'s component behavior package) was never installed, likely because the original interrupted `ng add` schematic never completed that step.

**Fix applied:**
```bash
npm install bootstrap
```
Then added Bootstrap's CSS to the `"styles"` array in `angular.json`:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```
Restarted `ng serve` to pick up the config change. Bootstrap 5.3.8 was confirmed installed; despite ngx-bootstrap 6.x originally targeting Bootstrap 3/4, the CSS layer is broadly backward-compatible at the class level, so no version conflict was expected for basic styling. Confirmed working after restart.

---

### Q: For the routing video, I was able to figure out that `app.routes.ts` needed `{path: 'home', loadComponent: () => import('./home/home').then(m => m.Home)}` added inside `export const routes: Routes = [ ]`.

**A:** Confirmed correct, and a good independent translation of the tutorial's intent. Older tutorials typically wire up routes through an `AppRoutingModule` with `RouterModule.forRoot(routes)`, but current standalone Angular handles this through `provideRouter(routes)` (usually in `app.config.ts`) paired with a `routes` array in `app.routes.ts`, no `AppRoutingModule` involved, the same standalone-vs-NgModule gap seen earlier with `app.module.ts`.

Worth noting: `loadComponent` with a dynamic `import()` enables lazy loading, the route's component code isn't downloaded by the browser until that path is navigated to, rather than being bundled into the initial page load. This is a notable improvement over the older pattern, found here as a side effect of translating the tutorial rather than the original goal.

---

### Q: The tutorial had me add `routerLinkActive="dark-text"`, but it doesn't seem to be applying.

**A:** Checked first for the same root cause as the earlier `routerLink` issue: `RouterLinkActive` needing to be explicitly imported into the standalone component (`nav.ts`), separately from `RouterLink`, since standalone components require every directive they use to be individually imported.

**Resolved independently** by checking Bootstrap's own documentation: switching from `text-secondary`/`dark-text` utility classes to Bootstrap 5's purpose-built `link-secondary`/`link-dark` classes fixed the issue:

```html
<a class="nav-link link-secondary" routerLink="/home" routerLinkActive="link-dark">Home</a>
```

Root cause was not Angular routing at all, it was a Bootstrap class mismatch. Bootstrap 5.3.8 (installed for this project, see earlier Bootstrap CSS fix) introduced `link-*` classes specifically designed for anchor tags with proper hover/focus state handling and specificity, whereas the tutorial's older `text-*`/custom class approach (likely written for an earlier Bootstrap version) wasn't reliably overriding link styling due to specificity or pseudo-class conflicts.

---

### Q: I don't see an `assets` folder. Where do I save a profile picture?

**A:** Checked `angular.json`'s `assets` configuration directly rather than assuming the folder was simply missing. It showed:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "public"
  }
]
```

This confirmed the project uses the newer Angular CLI **`public/` folder** convention (a root-level folder, sibling to `src/`) instead of the older `src/assets/` pattern. Files placed in `public/` are copied as-is into the build output.

**Resolution:** create a subfolder as needed (e.g., `public/images`) and save the file there. Reference it in templates **without** the `public/` prefix, since the glob copies the folder's contents to the served root:

```html
<img src="images/profile.jpg" alt="Profile picture">
```

---

### Q: VS Code shows `*ngFor` as deprecated, recommending `@for` instead. The tutorial uses `<ng-container *ngFor="let tag of project().tags">`. How do I convert it?

**A:** `*ngFor` still works (deprecated, not removed), but Angular's modern `@for` block syntax replaces it and is the recommended path going forward. Unlike `*ngFor`, `@for` requires an explicit `track` expression so Angular can identify each item across re-renders.

Translation:

```html
<!-- Old -->
<ng-container *ngFor="let tag of project().tags">
  <!-- content -->
</ng-container>

<!-- New -->
@for (tag of project().tags; track tag) {
  <!-- content -->
}
```

Notes:
- The `<ng-container>` wrapper can be dropped entirely; `@for` is a structural block, not a directive attached to a host element.
- `track` should reference something uniquely identifying each item; tracking by index (`track $index`) is a reasonable choice when list items are objects without a natural unique key, or when the list is short and static, as used here for the `Tag` class instances.
- `@for` blocks support an optional built-in `@empty` block for empty-list states, replacing the need for a separate `*ngIf` check.

---

*End of transcript.*
