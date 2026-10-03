import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/daily/random', destination: '/daily', permanent: true },
      { source: '/daily/prayer', destination: '/daily', permanent: true },
      { source: '/daily/chizuk', destination: '/daily', permanent: true },
      { source: '/daily/step', destination: '/daily', permanent: true },
      { source: '/return', destination: '/start', permanent: true },
      { source: '/support', destination: '/help', permanent: true },
      { source: '/help/talk', destination: '/help', permanent: true },
      { source: '/about', destination: '/start', permanent: true },
      { source: '/contact', destination: '/help', permanent: true },
    ];
  },
};

export default nextConfig;
