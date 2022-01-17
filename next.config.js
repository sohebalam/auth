module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.auth-mauve.vercel/:path*",
      },
    ]
  },
}
