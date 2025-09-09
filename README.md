# CWAIL — Companion for Writing with AI Literacy

## Project Overview

* **CWAIL** is a website that teaches students about AI and writing through short modules and interactive labs.
* Built with **React** (UI library), **TypeScript** (safer JS), **Vite** (fast dev server), and **Tailwind CSS** (styling).
* The site is JSON-driven: content files control module text and structure.

---

**Guide**  
Hi Professor Forte! Here's a step-by-step tutorial on how to **locally view CWAIL** before we release a live link. This guide assumes *no* technical knowledge — every step explains what it is and why we need it. If I make updates, I’ll ping you; when I do, just run the command `git pull` in the project folder terminal to fetch the latest changes. Feel free to reach out if you're confused at any point.

---

## Quick Rundown

**What you will install beforehand**
- Visual Studio Code (recommended)
- Node.js 18 LTS (or later)
- Git

**Commands you'll run (copy/paste)**
```bash
# clone repository (once)
git clone https://github.com/jgonzaludo/cwail-site
cd cwail

# install libraries (once)
npm install

# run the site locally
npm run dev
# open http://localhost:5173

# when I push updates
git pull
````

**Where to open**

* Open Terminal in VS Code: ``Ctrl + ` `` (Windows/Linux) or ``Cmd + ` `` (Mac).
* Open your browser and go to: `http://localhost:5173`.

**Disclaimer**

Don't worry if these things are unfamiliar, I tried my best to lay it all out in the next few sections. But if anything is still unclear, feel free to ping me.

---

## Very Short Glossary

* **IDE**: program used to open and edit code (we recommend **Visual Studio Code**).
* **Git**: tool that tracks file changes and lets us share updates.
* **Repository (repo)**: the project's folder stored on GitHub.
* **Clone**: make a local copy of the repo on your computer.
* **Node.js**: allows your computer to run the project’s code (outside the browser).
* **npm**: tool that installs the libraries the project needs.
* **Terminal / Command Prompt**: where you type commands (e.g., `git clone`).

---

## Setup

Each step explains **what** to do, **why** we do it, and the exact command to copy/paste.

### 1) Install an editor (recommended: Visual Studio Code)

**What it is:** An editor to view files and run commands.
**Why:** Makes it easy to open, read, and edit the project.

* Download: [https://code.visualstudio.com/](https://code.visualstudio.com/)
* Install and open it.

Optional extensions you can download in the app (helpful but not required):

* ESLint, Prettier, Tailwind CSS IntelliSense, GitLens.

---

### 2) Install Node.js

**What it is:** Software that runs the project on your computer.
**Why:** Required to run the local server and install libraries.

* Download the **LTS** version (18.x or later) from [https://nodejs.org/](https://nodejs.org/) and install.
* Verify installation (open Terminal / Command Prompt):

```bash
node -v
npm -v
```

You should see version numbers like `v18.x` and `9.x`.

---

### 3) Install Git (version control)

**What it is:** Tool to download project files and receive updates.
**Why:** We use `git` to clone the repository and fetch updates.

* Download & install from [https://git-scm.com/](https://git-scm.com/)
* Verify:

```bash
git --version
```

---

### 4) Get the code (clone the repo)

**What it is:** Copy the project files from GitHub to your computer.
**Why:** You need the code locally to run and preview it.

If the project is set up on GitHub and you have the URL:

```bash
git clone https://github.com/jgonzaludo/cwail-site
cd cwail
```

**When I push updates:** I’ll ping you. Then, inside the project folder run:

```bash
git pull
```

This downloads the newest changes I pushed.

---

### 5) Install project dependencies (one-time)

**What it is:** Downloads libraries the project needs (React, Tailwind, etc.).
**Why:** The code expects these libraries to run.

From the project root folder:

```bash
npm install
```

This creates a `node_modules` folder (can be large — that’s normal).

---

### 6) Start the development server (view the site locally)

**What it is:** Runs a small web server on your machine that serves the website.
**Why:** Lets you open the site in your browser and see changes live.

Run:

```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:5173
```

You should see the CWAIL homepage.

If you see nothing or an error, copy the error text and ask me — I’ll guide you.

---

## What’s in the project folder (simple guide)

* `src/` — source files (components, pages, content).

  * `components/` — UI parts (Accordion, ProgressBar, etc.).
  * `content/` — module JSON files (`src/content/sections/`).
  * `labs/` — interactive demos (tokenization).
* `package.json` — scripts and dependencies (`npm run dev`, etc.).
* `tailwind.config.js` — Tailwind setup.

---

## How content is authored (short, plain)

* Modules are JSON files in `src/content/sections/`.
* A module includes:

  * `lead` — short summary shown without clicking anything.
  * `keyTakeaways` — 2–4 bullets shown under the lead.
  * `sections` — full content shown in accordions.
* To edit text: open the JSON file in VS Code and save — the local preview updates automatically.

---

## Commands cheat-sheet (copy/paste)

```bash
# clone repository (once)
git clone https://github.com/<org-or-user>/cwail.git
cd cwail

# get updates when I ping you
git pull

# install libraries (once)
npm install

# run the site locally
npm run dev
# open http://localhost:5173

# build for production (optional)
npm run build
npm run preview
```

---

## Recent release (short summary)

**v0.2.0-alpha — 2025-09-07** — internal preview. UI/UX rework, accordion fixes, gradient hero, quiz gating, and accessibility improvements. Not publicly released.

---

## If I make updates — what you should do

When I say “I pushed an update,” open Terminal in the project folder and run:

```bash
git pull
```

If the dev server is running, stop it (`Ctrl+C`) and restart:

```bash
npm run dev
```

---

## Changelog

* **v0.2.0-alpha — 2025-09-07 (internal preview)**

  * UI/UX rework: replaced fragile canvas waves with an animated gradient hero.
  * Reorganized modules after Academic Case (Writing Process, Professional Case, Using AI Wisely, Using AI Poorly, AI as a Productivity Tool, Conclusion).
  * Standardized accordion JSON shape and reused the working Accordion component.
  * Quiz gating: added `/quiz` route (blank page) gated by localStorage completion flags.
  * Accessibility fixes: ARIA attributes, keyboard toggles, focus management.
  * Added `RevealOnScroll` (framer-motion) for fade-in of cards.

* **v0.1.1-alpha — 2025-07-02**

  * Content import round 1: Academic Case, Professional Case prose, sample quizzes (disabled gating).

* **v0.1.0-alpha — 2025-06-15**

  * Initial prototype: Vite + React + Tailwind baseline, tokenization lab skeleton.

> Status: internal alpha builds. Not publicly released.

---

## Final notes

* If you want a short video walkthrough of these steps, I can record one.
* If you get stuck at any step, **feel free to reach out** and I’ll help you troubleshoot.

---

```
```
