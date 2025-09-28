import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // opção 1: lista direta de domínios
    domains: ["i.pravatar.cc"],

    // OU (se preferir) use remotePatterns p/ mais controle:
    // remotePatterns: [
    //   { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
    // ],
  },
};

export default nextConfig;

