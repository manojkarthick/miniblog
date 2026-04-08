// @ts-check
import { defineConfig } from "astro/config";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGithubBlockquoteAlert from "remark-github-blockquote-alert";
import sitemap from "@astrojs/sitemap";

import { SITE_URL } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
      themes: ["catppuccin-latte", "catppuccin-mocha"],
      themeCssSelector: (theme) => `.${theme.type}`,
      defaultProps: {
        showLineNumbers: false,
      },
      styleOverrides: {
        codeFontFamily: "'Geist Mono', monospace",
        borderColor: ({ theme }) =>
          theme.type === "dark" ? "#3f3f46" : "#e4e4e7",
        borderRadius: "0.5rem",
        frames: {
          shadowColor: "transparent",
        },
      },
    }),
    icon(),
    mdx(),
    sitemap({
      filter: (page) => !page.match(/\/posts\/\d{4}\/\d{2}\//),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkGithubBlockquoteAlert],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: { type: "text", value: "#" },
          properties: {
            className: ["anchor-link"],
            ariaHidden: true,
            tabIndex: -1,
          },
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
