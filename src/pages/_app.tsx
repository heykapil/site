import type { AppProps } from 'next/app'
import { Container } from '@components/Container'
import { useRouter } from 'next/router'
import { Header } from '@components/Header'
import '@styles/global.css'
import '@styles/fonts.css'
import '@styles/markdown.css'
import '@styles/prism.css'

export default (A: AppProps) => {
  const r = useRouter()
  const C = Container[r.route]

  return C ? (
    <C>
      <Header router={r} />
      <A.Component {...A.pageProps} />
    </C>
  ) : (
    <Container.default>
      <Header router={r} />
      <A.Component {...A.pageProps} />
    </Container.default>
  )
}
