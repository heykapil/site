import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import RSlug from 'remark-slug'
import RAutoHeadings from 'remark-autolink-headings'
import Head from 'next/head'
import { mdXComponents } from '@components/Mdx'
import { getPostByFilename } from '@lib/posts'
import { getFiles } from '@lib/get-all-files'
import { constants } from '@lib/constants'
import { stripExtension } from '@components/utils'
import { PostMetadata } from '@components/types'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getFiles(constants.paths.posts).map((p) => ({
    params: { title: stripExtension(p) },
  })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<any, { title: string }> = async (
  p
) => {
  const params = p.params
  if (!params) return { props: {} }

  // use the url route to locate the markdown file
  // containing the blog post's contents
  const getPost = getPostByFilename(params.title)

  // use next-mdx-remote's serializer to imbube the raw markdown with fancy
  // capabilities from remark/rehype plugins
  const markdown = getPost.then(({ content }) => {
    return serialize(content, {
      mdxOptions: { remarkPlugins: [RSlug, RAutoHeadings], rehypePlugins: [] },
    })
  })

  return Promise.all([getPost, markdown])
    .then(([post, markdown]) => {
      return { props: { metadata: post.data, markdown } }
    })
    .catch(() => ({ props: {} }))
}

const PostHead = (p: PostMetadata) => {
  return (
    <div className="mb-4">
      <div className="post-title">{p.title}</div>
      <div className="post-date">
        {new Date(p.publishedAt).toLocaleDateString('en-sg', {
          dateStyle: 'medium',
        })}
      </div>
    </div>
  )
}

export default function Post(p: {
  metadata: PostMetadata
  markdown: MDXRemoteSerializeResult
}) {
  return !p.metadata ? null : (
    <>
      <Head>
        <title>{p.metadata.title}</title>
      </Head>
      <PostHead {...p.metadata} />
      <MDXRemote {...p.markdown} components={mdXComponents} />
    </>
  )
}
