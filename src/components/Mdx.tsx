import { getComponents } from '@lib/mdx'

const size = {
  h1: 'text-xl',
  h2: 'text-lg',
  h3: 'text-lg',
  h4: 'text-base',
}

// think of this as the tailwindcss config for MDX
export const mdxComponents = getComponents({
  h1: [size.h1, 'mt-6 mb-2 text-gray-500'],
  h2: [size.h2, 'mt-6 mb-2 text-gray-500'],
  h3: [size.h3, 'mt-6 mb-2 text-gray-500'],
  pre: [], // managed by @styles/prism.css
})
