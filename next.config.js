/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // 允许从 Unsplash 加载图片
  },
}

module.exports = nextConfig 