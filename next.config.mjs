// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

const webpackConfig = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  // Menangani masalah modul 'fs' pada sisi klien
  if (!isServer) {
    config.node = {
      fs: 'empty'
    };
  }

  // Penting: Kembalikan konfigurasi yang dimodifikasi
  return config;
};

export { webpackConfig as webpack };
export default nextConfig;
