import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/identidade-original",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/nr1-implementacao",
        destination: "/nr1-implementacao/index.html",
      },
      {
        source: "/nr1",
        destination: "/nr1-implementacao/index.html",
      },
    ];
  },
};

export default nextConfig;
