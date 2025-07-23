import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["https://zluonwllhgdziyvtumul.supabase.co"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
