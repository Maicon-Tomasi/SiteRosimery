import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      {
        source: "/identidade-original",
        destination: "/identidade-original/index.html",
      },
    ];
  },
};

export default nextConfig;
