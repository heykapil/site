import type { ComponentProps } from 'react'
import type { MDXProvider } from '@mdx-js/react'

type S = string | string[] | undefined
const g = (s: S): string => {
  const arr = typeof s === 'string' ? [s] : s ? s : []
  return arr.join(' ')
}
const c: Partial<{ [key in keyof JSX.IntrinsicElements]: string | string[] }> =
  {
    h2: 'text-lg mt-4 text-orange-400',
  }

// prettier-ignore
export const mdXComponents: ComponentProps<typeof MDXProvider>['components'] = {
  p:    (p) => <p    {...p} className={g(c.p)}   >{p.children}</p>,
  h1:   (p) => <h1   {...p} className={g(c.h1)}  >{p.children}</h1>,
  h2:   (p) => <h2   {...p} className={g(c.h2)}  >{p.children}</h2>,
  h3:   (p) => <h3   {...p} className={g(c.h3)}  >{p.children}</h3>,
  h4:   (p) => <h4   {...p} className={g(c.h4)}  >{p.children}</h4>,
  h5:   (p) => <h5   {...p} className={g(c.h5)}  >{p.children}</h5>,
  h6:   (p) => <h6   {...p} className={g(c.h6)}  >{p.children}</h6>,
  pre:  (p) => <pre  {...p} className={g(c.pre)} >{p.children}</pre>,
  span: (p) => <span {...p} className={g(c.span)}>{p.children}</span>,
  code: (p) => <code {...p} className={g(c.code)}>{p.children}</code>,
  sub:  (p) => <sub  {...p} className={g(c.sub)} >{p.children}</sub>,
  a:    (p) => <a    {...p} className={g(c.a)}   >{p.children}</a>,
}
