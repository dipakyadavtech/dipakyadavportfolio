/** @type {import('next').NextConfig} */

// Deployed via GitHub Pages on a custom apex domain (thinkinbits.in), so
// the site serves from the root — no basePath, no assetPrefix.
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },
};

export default nextConfig;
