import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // <--- TAMBAHKAN BARIS INI untuk memicu Static Export
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;