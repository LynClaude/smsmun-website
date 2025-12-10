/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Baidu-Site-Verification',
            value: 'codeva-dEZ6qyjTdt',
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
