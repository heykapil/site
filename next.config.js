module.exports = {
  async redirects() {
    return [
      {
        source: '/prez',
        destination: '/mock-op.pdf',
        permanent: true,
      },
    ]
  },
}
