---
title: "Markdown Style Guide"
description: "Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro."
date: "Nov 07 2024"
---

# H1

## H2

### H3

#### H4

##### H5

###### H6

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

![blog placeholder](/static/blog-placeholder.png)

<video controls>
  <source src="/static/dynamic-island-animation.mp4" type="video/mp4">
</video>

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use _Markdown syntax_ within a blockquote.

## Callouts

> [!NOTE]
> This is a note callout for general information.

> [!TIP]
> This is a tip callout for helpful suggestions.

> [!IMPORTANT]
> This is an important callout for critical information.

> [!WARNING]
> This is a warning callout for potential issues.

> [!CAUTION]
> This is a caution callout for dangerous actions.

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

## Expressive Code Features

This blog uses [Expressive Code](https://expressive-code.com/) for syntax highlighting, which provides several useful features beyond basic highlighting.

### Code Block Titles

Use the `title` attribute to display a filename or label above a code block.

```js title="src/utils/greet.js"
export function greet(name) {
  return `Hello, ${name}!`;
}
```

### Line Numbers

Add `showLineNumbers` to display line numbers alongside your code.

```python showLineNumbers
def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fibonacci(10))
```

### Line Markers

Highlight specific lines using `ins` (inserted/green), `del` (deleted/red), and `mark` (highlighted) markers by specifying line numbers in the meta string.

```js title="src/config.ts" del={4} ins={5} mark={6}
const apiUrl = "https://api.example.com";

export const config = {
  debug: false,
  debug: true,
  timeout: 3000,
};
```

### Terminal Frames

Code blocks with shell languages like `bash` or `sh` are automatically rendered with a terminal frame.

```bash
pnpm install
pnpm dev
pnpm build
```

### Text Markers

Use regular expressions to highlight specific words or phrases within code.

```rust "mut" /println!.*"/
fn main() {
    let mut count = 0;
    for i in 0..5 {
        count += i;
    }
    println!("The total is: {count}");
}
```

### Diff Syntax

Use the `diff` language with `+` and `-` prefixes to show changes.

```diff lang="json" title="package.json"
{
  "dependencies": {
-    "astro": "^5.0.0",
+    "astro": "^6.1.4",
-    "tailwindcss": "^3.4.0"
+    "tailwindcss": "^4.2.2"
  }
}
```

### Collapsible Sections

Collapse less important lines to keep focus on what matters using `collapse` markers.

```ts title="src/api.ts" collapse={1-5}
import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

// Main function
export async function getUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return UserSchema.parse(data);
}
```

1. First item
2. Second item
3. Third item

Hello world!

- List item
- Another item
  - List item
  - Another item
  - And another item
- And another item
  - List item
  - Another item
  - And another item

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
