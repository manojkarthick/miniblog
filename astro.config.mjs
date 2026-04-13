// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGithubBlockquoteAlert from "remark-github-blockquote-alert";
import sitemap from "@astrojs/sitemap";

import { SITE_URL } from "./src/consts";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Geist",
      cssVariable: "--font-geist",
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-variable.woff2"],
            weight: "100 900",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      fallbacks: ["ui-monospace", "monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-mono-variable.woff2"],
            weight: "100 900",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
  ],

  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
      themes: ["catppuccin-latte", "catppuccin-mocha"],
      themeCssSelector: (theme) => `.${theme.type}`,
      defaultProps: {
        showLineNumbers: false,
      },
      styleOverrides: {
        codeFontFamily: "var(--font-geist-mono), monospace",
        borderColor: ({ theme }) =>
          theme.type === "dark" ? "#3f3f46" : "#e4e4e7",
        borderRadius: "0.5rem",
        frames: {
          shadowColor: "transparent",
        },
      },
    }),
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
    plugins: [tailwindcss(), Icons({ compiler: "astro" })],
  },

  adapter: cloudflare(),
});
