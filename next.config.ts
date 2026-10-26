import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * Published articles as "locale/slug", computed at build time so the proxy can
 * answer unknown or draft article URLs with a real 404 without reading files.
 */
function publishedPosts() {
  const dir = path.join(process.cwd(), "src/content/blog");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap(({ name: slug }) =>
      readdirSync(path.join(dir, slug))
        .filter((file) => file.endsWith(".mdx"))
        .filter((file) => {
          const source = readFileSync(path.join(dir, slug, file), "utf8");
          return !/^\s*draft:\s*true/m.test(source);
        })
        .map((file) => `${file.replace(/\.mdx$/, "")}/${slug}`),
    );
}

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    globalNotFound: true,
  },
  env: {
    PUBLISHED_POSTS: JSON.stringify(publishedPosts()),
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        // Vercel URLs (roltek-web.vercel.app and per-deployment URLs) serve
        // previews, so search engines must only index the real domain.
        source: "/:path*",
        has: [{ type: "host", value: "roltek-web(-[a-z0-9-]+)?\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

// Plugins are referenced by name so the config stays serializable for Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        { theme: "github-dark-dimmed", keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
