/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "localhost", "*"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
