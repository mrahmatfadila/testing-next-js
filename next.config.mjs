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

const webpackConfig = (config, { isServer }) => {
  if (!isServer) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };
  }

  return config;
};

export { webpackConfig as webpack };
export default nextConfig;
