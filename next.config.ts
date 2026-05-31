import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  // Allow testing on phone/tablet via local network IP (e.g. http://192.168.1.181:3000)
  allowedDevOrigins: ["192.168.1.181"],
};

export default nextConfig;
