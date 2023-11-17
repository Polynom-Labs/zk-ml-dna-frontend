/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/items",
        destination: "https://zk-ml.namer.id/researches",
      },
      {
        source: "/upload",
        destination: "https://zk-ml.namer.id/upload",
      },
    ];
  },
}

module.exports = nextConfig
