/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "tailwindui.com",
      },
    ],
  },

  crossOrigin: "anonymous",
};

module.exports = nextConfig;
