---
title: "Customizing Miniblog"
description: "How to customize the Miniblog blog theme."
date: "Nov 26 2024"
---

## Blog Posts

All blog posts should be saved as [Markdown](https://www.markdownguide.org/) or [MDX](https://mdxjs.com/) files within the `src/content/posts/` directory, and have valid frontmatter as defined by the `posts` content collection in the `src/content.config.ts` file. Here's an example of what valid frontmatter would look like:

```
---
title: "Customizing Miniblog"
description: "How to customize the Miniblog blog theme."
date: "Nov 26 2024"
image: "/static/blog-placeholder.png"
---
```

> Note that the `image` frontmatter property is optional, and will by default use `/static/blog-placeholder.png`. You may update this by replacing the `/static/blog-placeholder.png` file in the `public/static/` directory with a file of your choice with the same name.

## Codeblock Syntax Highlighting

This blog uses [Expressive Code](https://expressive-code.com/) for syntax highlighting, which provides features like code block titles, line highlighting, and a copy button. To customize the themes, modify the `themes` array in the `expressiveCode()` integration options in `astro.config.mjs`. Expressive Code supports all [Shiki themes](https://shiki.style/themes).

## OpenGraph Image Support

As mentioned in the [Blog Posts](#blog-posts) section above, a default OpenGraph image is provided for all pages of the site.

To update the site-wide, default OpenGraph image, replace the `/static/blog-placeholder.png` file in the `public/static/` directory with a file of your choice with the same name.

To add a unique OpenGraph image for a specific blog post, add the new image to the `public/static/` directory, and update the `image` frontmatter property for the respective blog post to use the new image.

## View Transitions

View transitions, or page-to-page navigation animations, also come out of the box with Astro. Please review the Astro [View Transitions](https://docs.astro.build/en/guides/view-transitions/) documentation if you would like to modify the animations of the site.

## Colors

Miniblog uses [Tailwind CSS](https://tailwindcss.com/) for its styling, and therefore uses Tailwind's native color variables throughout the site. By default, Miniblog uses `neutral` for the majority of its colors, with the exception of links that use `blue` and codeblocks that utilize syntax highlighting.
