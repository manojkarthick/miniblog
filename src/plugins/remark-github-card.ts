import { visit } from "unist-util-visit";

const DIRECTIVE_NAME = "github";
const GITHUB_URL_PREFIX = "https://github.com/";

type DirectiveAttributes = Record<string, string | null | undefined>;

type LeafDirectiveNode = {
  type: "leafDirective";
  name: string;
  attributes?: DirectiveAttributes;
};

type HtmlLikeNode = {
  type: "paragraph";
  children: Array<HtmlLikeNode | { type: "text"; value: string }>;
  data: {
    hName: string;
    hProperties?: Record<string, string>;
  };
};

const text = (value: string): { type: "text"; value: string } => ({
  type: "text",
  value,
});

const h = (
  tagName: string,
  properties: Record<string, string> = {},
  children: HtmlLikeNode["children"] = [],
): HtmlLikeNode => ({
  type: "paragraph",
  children,
  data: {
    hName: tagName,
    hProperties: properties,
  },
});

const isLeafGithubDirective = (node: unknown): node is LeafDirectiveNode => {
  if (!node || typeof node !== "object") {
    return false;
  }

  const maybeDirective = node as Partial<LeafDirectiveNode>;
  return (
    maybeDirective.type === "leafDirective" &&
    maybeDirective.name === DIRECTIVE_NAME
  );
};

const createCardId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `GC-${crypto.randomUUID()}`;
  }

  return `GC-${Math.random().toString(36).slice(2, 10)}`;
};

const normalizeGithubInput = (value: string) =>
  value
    .trim()
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\/+$/, "");

const formatCompactScript = `Intl.NumberFormat(undefined, {
  notation: "compact",
  maximumFractionDigits: 1,
})
  .format`;

const buildRepoScript = (cardId: string, repoName: string) => {
  const endpoint = JSON.stringify(`https://api.github.com/repos/${repoName}`);
  const cardIdLiteral = JSON.stringify(cardId);
  const warningPrefix = JSON.stringify(
    `[GITHUB-CARD] Error loading card for ${repoName} | ${cardId}.`,
  );

  return `
(() => {
  const card = document.getElementById(${cardIdLiteral});
  if (!card) return;

  fetch(${endpoint}, { referrerPolicy: "no-referrer" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(\`GitHub API returned \${response.status}\`);
      }
      return response.json();
    })
    .then((data) => {
      card.classList.remove("gh-loading");

      const descriptionEl = card.querySelector(".gh-description");
      if (descriptionEl) {
        if (data.description) {
          descriptionEl.textContent = String(data.description).replace(/:[a-zA-Z0-9_]+:/g, "");
        } else {
          descriptionEl.style.display = "none";
        }
      }

      const languageEl = card.querySelector(".gh-language");
      if (languageEl) {
        if (data.language) {
          languageEl.textContent = data.language;
        } else {
          languageEl.style.display = "none";
        }
      }

      const forksEl = card.querySelector(".gh-forks");
      if (forksEl) {
        forksEl.textContent = (${formatCompactScript})(Number(data.forks ?? 0)).replaceAll("\\u202f", "");
      }

      const starsEl = card.querySelector(".gh-stars");
      if (starsEl) {
        starsEl.textContent = (${formatCompactScript})(Number(data.stargazers_count ?? 0)).replaceAll("\\u202f", "");
      }

      const avatarEl = card.querySelector(".gh-avatar");
      if (avatarEl && data.owner?.avatar_url) {
        avatarEl.style.backgroundImage = "url(" + data.owner.avatar_url + ")";
      }

      const licenseEl = card.querySelector(".gh-license");
      if (licenseEl) {
        if (data.license?.spdx_id) {
          licenseEl.textContent = data.license.spdx_id;
        } else {
          licenseEl.style.display = "none";
        }
      }
    })
    .catch((error) => {
      card.classList.remove("gh-loading");
      card.classList.add("gh-error");

      const descriptionEl = card.querySelector(".gh-description");
      if (descriptionEl) {
        descriptionEl.textContent = "Unable to load repository details right now.";
        descriptionEl.style.display = "";
      }

      console.warn(${warningPrefix}, error);
    });
})();
  `;
};

const buildUserScript = (cardId: string, username: string) => {
  const endpoint = JSON.stringify(`https://api.github.com/users/${username}`);
  const cardIdLiteral = JSON.stringify(cardId);
  const warningPrefix = JSON.stringify(
    `[GITHUB-CARD] Error loading card for ${username} | ${cardId}.`,
  );

  return `
(() => {
  const card = document.getElementById(${cardIdLiteral});
  if (!card) return;

  fetch(${endpoint}, { referrerPolicy: "no-referrer" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(\`GitHub API returned \${response.status}\`);
      }
      return response.json();
    })
    .then((data) => {
      card.classList.remove("gh-loading");

      const avatarEl = card.querySelector(".gh-avatar");
      if (avatarEl && data.avatar_url) {
        avatarEl.style.backgroundImage = "url(" + data.avatar_url + ")";
      }

      const followersEl = card.querySelector(".gh-followers");
      if (followersEl) {
        followersEl.textContent = (${formatCompactScript})(Number(data.followers ?? 0)).replaceAll("\\u202f", "");
      }

      const repositoriesEl = card.querySelector(".gh-repositories");
      if (repositoriesEl) {
        repositoriesEl.textContent = (${formatCompactScript})(Number(data.public_repos ?? 0)).replaceAll("\\u202f", "");
      }

      const regionEl = card.querySelector(".gh-region");
      if (regionEl) {
        if (data.location) {
          regionEl.textContent = data.location;
        } else {
          regionEl.style.display = "none";
        }
      }
    })
    .catch((error) => {
      card.classList.remove("gh-loading");
      card.classList.add("gh-error");
      console.warn(${warningPrefix}, error);
    });
})();
  `;
};

export const remarkGithubCard = () => (tree: unknown) => {
  visit(
    tree as Parameters<typeof visit>[0],
    (
      node: unknown,
      index: number | undefined,
      parent: { children: unknown[] } | undefined,
    ) => {
      if (!parent || index === undefined || !isLeafGithubDirective(node)) {
        return;
      }

      const rawInput = node.attributes?.repo ?? node.attributes?.user;
      if (!rawInput || typeof rawInput !== "string") {
        return;
      }

      const normalizedInput = normalizeGithubInput(rawInput);
      if (!normalizedInput) {
        return;
      }

      const inputParts = normalizedInput.split("/").filter(Boolean);
      if (inputParts.length === 0) {
        return;
      }

      const cardId = createCardId();

      if (inputParts.length > 1) {
        const repoName = `${inputParts[0]}/${inputParts[1]}`;
        const repoUrl = `${GITHUB_URL_PREFIX}${repoName}`;

        parent.children.splice(
          index,
          1,
          h("div", { id: cardId, class: "github-card gh-loading" }, [
            h("div", { class: "gh-title" }, [
              h("span", { class: "gh-avatar" }),
              h("a", { class: "gh-text", href: repoUrl }, [text(repoName)]),
              h("span", { class: "gh-icon" }),
            ]),
            h("div", { class: "gh-description" }, [
              text("Loading repository details..."),
            ]),
            h("div", { class: "gh-chips" }, [
              h("span", { class: "gh-stars" }, [text("...")]),
              h("span", { class: "gh-forks" }, [text("...")]),
              h("span", { class: "gh-license" }, [text("...")]),
              h("span", { class: "gh-language" }, [text("...")]),
            ]),
            h("script", {}, [text(buildRepoScript(cardId, repoName))]),
          ]) as unknown,
        );
      } else if (inputParts.length === 1) {
        const username = inputParts[0];
        const userUrl = `${GITHUB_URL_PREFIX}${username}`;

        parent.children.splice(
          index,
          1,
          h("div", { id: cardId, class: "github-card gh-simple gh-loading" }, [
            h("div", { class: "gh-title" }, [
              h("span", { class: "gh-avatar" }),
              h("a", { class: "gh-text", href: userUrl }, [text(username)]),
              h("span", { class: "gh-icon" }),
            ]),
            h("div", { class: "gh-chips" }, [
              h("span", { class: "gh-followers" }, [text("...")]),
              h("span", { class: "gh-repositories" }, [text("...")]),
              h("span", { class: "gh-region" }, [text("...")]),
            ]),
            h("script", {}, [text(buildUserScript(cardId, username))]),
          ]) as unknown,
        );
      }
    },
  );
};
