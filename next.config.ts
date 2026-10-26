import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    globalNotFound: true,
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
