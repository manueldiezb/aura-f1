import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "media.formula1.com" },
      { hostname: "www.formula1.com" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
