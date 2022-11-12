module.exports = {
  async redirects() {
    return [
      {
        source: '/print',
        destination: '/print.pdf',
        permanent: false,
      },
    ]
  },
}
