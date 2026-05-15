/** @type {import('next').NextConfig} */

// When deploying to GitHub Pages we serve from
// https://dipakyadavtech.github.io/dipakyadavportfolio/, which requires a
// matching basePath + assetPrefix and a static export. Set GITHUB_PAGES=true
// (the Pages workflow does this) to switch the build into that mode. Local
// `next dev` keeps the dev-friendly defaults.
const isGhPages = process.env.GITHUB_PAGES === 'true';
const repo = 'dipakyadavportfolio';
const basePath = isGhPages ? `/${repo}` : '';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },
};

export default nextConfig;
