/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "perpustakaan.jakarta.go.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
