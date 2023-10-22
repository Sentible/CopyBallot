/** @type {import('next').NextConfig} */

const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, {isServer}) => {
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
    }))

    return config
},
images: {
  domains: ['localhost'],
},
}

module.exports = nextConfig
