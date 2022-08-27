import { createElement } from 'react'
import { stringify } from '@utils'
import type { CustomComponents, MDXComponents } from '@types'

type E = JSX.IntrinsicElements
type Output<T extends keyof E> = (p: E[T]) => JSX.Element
function build<T extends keyof E>(tag: T, className: string): Output<T> {
  return (p: E[T]) => createElement(tag, { className, ...p })
}

export function getComponents(c: CustomComponents): MDXComponents {
  let res = {} as MDXComponents
  const tags = Object.keys(c) as (keyof E)[]
  tags.forEach((tag) => {
    const className = c[tag]
    if (!className) return
    res = { ...res, [tag]: build(tag, stringify(className)) }
  })
  return res
}
