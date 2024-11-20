/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'wudynext.netlify.app'],
  },
  webpack: (config, { }) => {
    config.resolve.fallback = { 
      fs: false,
    };
    config.plugins.push(
      new NodePolyfillPlugin(),
    );
    return config;
  },
}

module.exports = nextConfig
