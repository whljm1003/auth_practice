/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "localhost", "*"],
  },
  reactStrictMode: true,
  swcMinify: true,
  // env 내용 추가
  env: {
    KAKAO_SECRET: process.env.KAKAO_SECRET,
    KAKAO_REST_API: process.env.KAKAO_REST_API,
    KAKAO_JAVASCRIPT_KEY: process.env.KAKAO_JAVASCRIPT_KEY,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    KAKAO_REDIRECT_URL: process.env.KAKAO_REDIRECT_URL,
  },
};

module.exports = nextConfig;
