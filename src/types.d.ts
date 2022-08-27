import type { MDXProvider } from '@mdx-js/react'
import type { ReactElement, ComponentProps } from 'react'

export type Children = ReactElement | ReactElement[] | null

export type PostMetadata = {
  title: string
  publishedAt: string
  tags: string[]
  summary: string
}

// MDX dance

export type CustomComponents = Partial<{
  [key in keyof JSX.IntrinsicElements]: string | string[]
}>

export type MDXComponents = Exclude<
  ComponentProps<typeof MDXProvider>['components'],
  undefined
>
