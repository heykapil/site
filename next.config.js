module.exports = {
  async redirects() {
    return [
      {
        source: '/prez',
        destination: '/mock-op.pdf',
        permanent: true,
      },
      {
        source: '/ex',
        destination: '/mock-op-extended.pdf',
        permanent: true,
      },
    ]
  },
}
