import { defineConfig, type Plugin } from "vite";
import { ogImageUrl, pageTitle, portfolioConfig } from "./src/config";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildSocialMeta = (): string => {
  const description = escapeHtml(portfolioConfig.metaDescription);
  const title = escapeHtml(pageTitle);
  const canonicalUrl = escapeHtml(portfolioConfig.siteUrl.replace(/\/$/, ""));
  const imageUrl = escapeHtml(ogImageUrl);

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />`;
};

const buildOgImageSvg = (): string => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeHtml(pageTitle)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080b14"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#74f0c1"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="72" y="72" width="1056" height="486" rx="32" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
  <rect x="120" y="120" width="88" height="88" rx="22" fill="#0b1020"/>
  <path d="M138 138h36c16 0 28 12 28 28s-12 28-28 28h-36V138Zm18 18v20h18a10 10 0 1 0 0-20h-18Z" fill="#74f0c1"/>
  <path d="m198 198 18 18" stroke="#a78bfa" stroke-width="8" stroke-linecap="round"/>
  <text x="120" y="290" fill="#f7f8fb" font-family="Inter, Segoe UI, sans-serif" font-size="54" font-weight="700">${escapeHtml(portfolioConfig.name)}</text>
  <text x="120" y="360" fill="url(#accent)" font-family="Inter, Segoe UI, sans-serif" font-size="34" font-weight="600">${escapeHtml(portfolioConfig.role)}</text>
  <text x="120" y="430" fill="#9ba7bc" font-family="Inter, Segoe UI, sans-serif" font-size="28">${escapeHtml(portfolioConfig.headline)}</text>
  <text x="120" y="500" fill="#74f0c1" font-family="Inter, Segoe UI, sans-serif" font-size="22" font-weight="700" letter-spacing="4">QA PORTFOLIO</text>
</svg>`;

const portfolioMetaPlugin = (): Plugin => ({
  name: "portfolio-meta",
  transformIndexHtml(html) {
    return html.replace("<!-- portfolio-meta -->", buildSocialMeta());
  },
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      const pathname = request.url?.split("?")[0];

      if (pathname === "/og-image.svg" || pathname?.endsWith("/og-image.svg")) {
        response.setHeader("Content-Type", "image/svg+xml");
        response.end(buildOgImageSvg());
        return;
      }

      next();
    });
  },
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "og-image.svg",
      source: buildOgImageSvg()
    });
  }
});

export default defineConfig({
  // Relative assets work for both username.github.io and username.github.io/repository-name.
  base: "./",
  plugins: [portfolioMetaPlugin()]
});
