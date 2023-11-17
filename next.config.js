/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/items",
        destination: "https://zk-ml.namer.id/researchers",
      },
      {
        source: "/upload",
        destination: "https://zk-ml.namer.id/upload",
      },
    ];
  },
}

module.exports = nextConfig
