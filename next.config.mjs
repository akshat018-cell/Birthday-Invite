/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure static export compatibility if user runs `next export` or has static build
  trailingSlash: true,
};

export default nextConfig;

