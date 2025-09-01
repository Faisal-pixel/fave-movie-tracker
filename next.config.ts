import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tvmaze.com", // https://static.tvmaze.com/
        pathname: "**", // allow all paths
      },
    ]
  }
};

export default nextConfig;
