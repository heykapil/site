import { getFiles } from '@lib/get-files'
import { GetStaticProps } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { constants } from '@lib/constants'
import { useEffect, useState } from 'react'
import { getTime, isMarkdown, stripExtension } from '@utils'
import { SquareIcon } from '@primer/octicons-react'
import Image from 'next/image'
import { getPostBySlug } from '@lib/posts'
import { PostMetadata } from '@types'

type PostMeta = PostMetadata & {
  filename: string
}

export const getStaticProps: GetStaticProps = async () => {
  /*
   * use the url route to locate the markdown file
   * containing the blog post's contents
   */
  const postsDir = constants.paths.posts
  const posts = getFiles(postsDir).filter(isMarkdown).map(stripExtension)
  const postMetadata: PostMeta[] = await Promise.all(
    posts.map((p) => getPostBySlug(p))
  )
    .then((res) => res.map((m, i) => ({ filename: posts[i], ...m.data })))
    .catch(() => [])

  return {
    props: {
      posts,
      postMetadata,
      photos: getFiles(constants.paths.photos)
        .filter((x) => !x.endsWith('.json'))
        .reverse(),
    },
  }
}

const Post = (p: { router: NextRouter; metadata?: PostMeta }) => {
  const meta = p.metadata
  if (!meta) return null
  return (
    <div
      className="cursor-pointer py-1.5 group"
      onClick={() => p.router.push('/posts/' + meta.filename)}
    >
      <h2 className="group-hover:underline truncate">{meta.title}</h2>
      <div className="text-sm text-gray-500 truncate">
        <span className="tabular-nums">{meta.publishedAt}</span>
        <span className="text-gray-300 mx-2">|</span>
        <span>{meta.summary}</span>
      </div>
    </div>
  )
}

const Posts = (p: {
  router: NextRouter
  posts: string[]
  metadata: PostMeta[]
}) => {
  return (
    <div className="flex flex-col">
      {p.posts.map((t, i) => (
        <Post
          key={i}
          metadata={p.metadata.find((m) => m.filename === t)}
          router={p.router}
        />
      ))}
    </div>
  )
}

const Photos = (p: { router: NextRouter; photos: string[] }) => {
  const r = p.router
  const Photo = (p: { src: string }) => (
    <div
      className="inline-block relative h-48 w-64 cursor-pointer"
      onClick={() => r.push('/photos')}
    >
      <Image src={'/photos/' + p.src} objectFit="cover" layout="fill" />
    </div>
  )
  return (
    <div className="flex overflow-x-scroll h-56 pt-1">
      <div className="flex flex-nowrap space-x-4">
        {p.photos.slice(0, 4).map((f, i) => (
          <Photo key={i} src={f} />
        ))}
      </div>
    </div>
  )
}

const About = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const t = setTimeout(() => setDate(new Date()), 1000)
    return () => clearTimeout(t)
  })
  const github = () => <a href="https://github.com/nguyenvukhang">GitHub</a>
  const instagram = () => <a href="https://www.instagram.com/nguyenvukhang_">Instagram</a>
  const cv = () => <a href="https://read.cv/nguyenvukhang">CV</a>
  return (
    <>
      <p>An efficiency junkie who also happens to write code and do sports.</p>
      <p>
        Currently piecing together a degree at National University of Singapore,
        where it's {getTime(date)}.
      </p>
      <p>I also hang out on {instagram()} and {github()}. Here's my {cv()}.</p>
    </>
  )
}

const Chunk = (p: JSX.IntrinsicElements['div']) => {
  const Separator = () => (
    <div className="flex justify-center my-8">
      <SquareIcon className="fill-gray-400" />
    </div>
  )
  return (
    <>
      <Separator />
      {p.children}
    </>
  )
}

export default function App(p: {
  posts: string[]
  photos: string[]
  postMetadata: PostMeta[]
}) {
  const r = useRouter()
  const H1 = (p: { children: string }) => <h1 className="mb-2">{p.children}</h1>
  return (
    <div className="mb-24">
      <About />
      <Chunk>
        <div className="flex flex-row items-baseline space-x-4">
          <H1>Photos</H1>
          <a className="text-sm" onClick={() => r.push('/photos')}>
            All photos
          </a>
        </div>
        <Photos router={r} photos={p.photos} />
      </Chunk>
      <Chunk>
        <H1>Posts</H1>
        <Posts router={r} posts={p.posts} metadata={p.postMetadata} />
      </Chunk>
      <Chunk>
        <h2 className="inline">{constants.name}</h2>
        &nbsp;
        <div className="inline">
          (<a href={constants.repo}>View source</a>)
        </div>
      </Chunk>
    </div>
  )
}
