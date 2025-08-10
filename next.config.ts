import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Disable image optimization since Firebase hosting doesn't support it
  images: {
    unoptimized: true
  }
};

export default nextConfig;
