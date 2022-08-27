import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import RSlug from 'remark-slug'
import RAutoHeadings from 'remark-autolink-headings'
import RPrism from 'remark-prism'
import Head from 'next/head'
import { mdxComponents } from '@components/Mdx'
import { getPostBySlug } from '@lib/posts'
import { getFiles } from '@lib/get-files'
import { constants } from '@lib/constants'
import { stripExtension } from '@utils'
import { PostMetadata } from '@types'
import { TelescopeIcon } from '@primer/octicons-react'

type API = { metadata?: PostMetadata; markdown?: MDXRemoteSerializeResult }
type Params = { slug: string }

/**
 * lets `next build` what paths/urls are expected to be statically generated
 */
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getFiles(constants.paths.posts).map((p) => ({
    params: { slug: stripExtension(p) },
  })),
  fallback: false,
})

/**
 * uses the current url to find a post MDX/markdown file and parses it
 */
export const getStaticProps: GetStaticProps<API, Params> = async (p) => {
  const params = p.params
  if (!params) return { props: {} }

  // use the url route to locate the markdown file
  // containing the blog post's contents
  const getPost = getPostBySlug(params.slug)

  // use next-mdx-remote's serializer to imbube the raw markdown with fancy
  // capabilities from remark/rehype plugins
  const markdown = getPost.then(({ content }) =>
    serialize(content, {
      mdxOptions: {
        remarkPlugins: [RSlug, RAutoHeadings, RPrism],
        rehypePlugins: [],
      },
    })
  )

  return Promise.all([getPost, markdown])
    .then(([post, markdown]) => ({ props: { metadata: post.data, markdown } }))
    .catch(() => ({ props: {} }))
}

const PostHead = (p: PostMetadata) => (
  <div className="mb-4">
    <div className="post-title">{p.title}</div>
    <div className="post-date">
      {new Date(p.publishedAt).toLocaleDateString('en-sg', {
        dateStyle: 'medium',
      })}
    </div>
  </div>
)

export default function Post(p: API) {
  const { markdown, metadata } = p
  return markdown && metadata ? (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <PostHead {...metadata} />
      <MDXRemote {...markdown} components={mdxComponents} lazy />
      <div className="flex justify-center mt-16 mb-24">
        <TelescopeIcon  className='fill-gray-500'/>
      </div>
    </>
  ) : null
}
