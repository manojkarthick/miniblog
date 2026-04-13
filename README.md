# Miniblog

**Miniblog** is an opinionated and minimal blogging template built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), inspired by [jrmyphlmn.com](https://jrmyphlmn.com/). This fork tracks upstream and includes additional upgrades for a modern toolchain and better template defaults.

**Live site:** https://miniblog.merci.workers.dev

- Astro 6 + Tailwind CSS 4
- Blog posts with [Markdown](https://www.markdownguide.org/) and [MDX](https://mdxjs.com/)
- Code blocks powered by [Expressive Code](https://expressive-code.com/) (copy button, line highlighting, and more)
- [RSS](https://en.wikipedia.org/wiki/RSS) feed and sitemap generation
- SEO metadata with OpenGraph image support
- Accessible client-side route transitions
- Dark mode
- Formatting with [Prettier](https://prettier.io/)
- CI checks for formatting and Astro type/content validation

## Getting Started

1. Click **Use this template** to create your own repository.
2. Clone your new repository:

```bash
git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
cd [YOUR_REPO_NAME]
```

3. Use Node.js `22.12.0` or newer.
4. Install dependencies with pnpm:

```bash
pnpm install
```

5. Start development:

```bash
pnpm dev
```

6. Run checks before pushing:

```bash
pnpm format:check
pnpm astro check
pnpm build
```

## Customization

### Site Configuration

Update your site metadata in `src/consts.ts`:

```ts
export const SITE_URL = "https://your-domain.com";
export const SITE_TITLE = "Your Blog";
export const SITE_DESCRIPTION = "Your site description.";
export const EMAIL = "you@example.com";
```

### Blog Posts

Add Markdown or MDX files in `src/content/posts/`.

Frontmatter fields:

```yml
---
title: "Lorem Ipsum"
description: "Lorem ipsum dolor sit amet."
date: "2024-11-06" # YYYY-MM-DD
image: "/static/blog-placeholder.png" # optional
---
```

The content schema lives in `src/content.config.ts`.

### Markdown Styling

Customize Markdown styles in `src/styles/global.css`.

### Fonts

Fonts are managed with Astro v6 Fonts API (`fonts` in `astro.config.mjs`) using the local provider and loaded via `<Font />` in `src/layouts/Layout.astro`.

## Template Changes In This Fork

These PRs are included in this fork for users starting from this template:

- [#1](https://github.com/manojkarthick/miniblog/pull/1) Migrate from npm to pnpm, add lockfile, and configure Corepack compatibility.
- [#2](https://github.com/manojkarthick/miniblog/pull/2) Upgrade to Astro 6 and Tailwind CSS 4, including content layer and API migrations.
- [#3](https://github.com/manojkarthick/miniblog/pull/3) Add GitHub Actions checks for `pnpm format:check` and `pnpm astro check`.
- [#4](https://github.com/manojkarthick/miniblog/pull/4) Replace Shiki with Expressive Code and enable richer code block UX.
- [#6](https://github.com/manojkarthick/miniblog/pull/6) Add anchor links to post section headings for easier deep-linking.
- [#7](https://github.com/manojkarthick/miniblog/pull/7) Add GitHub-style markdown callouts (`[!NOTE]`, `[!TIP]`, `[!WARNING]`, etc.).
- [#8](https://github.com/manojkarthick/miniblog/pull/8) Persist light/dark theme selection and keep code block themes in sync.
- [#10](https://github.com/manojkarthick/miniblog/pull/10) Add `::github` directive cards for repos/users with miniblog-native styling.
- [#13](https://github.com/manojkarthick/miniblog/pull/13) Replace the remark directive plugin with a single self-contained `GithubCard.astro` MDX component.
- [#14](https://github.com/manojkarthick/miniblog/pull/14) Replace `astro-icon` with `unplugin-icons` for homepage social icons while preserving styling and hover behavior.
- [#16](https://github.com/manojkarthick/miniblog/pull/16) Fix GitHub card dark mode (use explicit `.dark` class selectors instead of `dark:` variants), improve light mode contrast, fix list indentation, and add styled task list checkboxes.

## License

This project is open source and available under the [MIT License](LICENSE).
