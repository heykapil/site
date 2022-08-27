import { getComponents } from '@lib/mdx'

// think of this as the tailwindcss config for MDX
export const mdxComponents = getComponents({
  h2: 'text-lg mt-4 text-red-400',
  h1: ['text-4xl'],
})
