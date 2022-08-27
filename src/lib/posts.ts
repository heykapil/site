import { readFileSync } from 'fs'
import { resolve } from 'path'
import matter, { GrayMatterFile } from 'gray-matter'
import { constants } from '@lib/constants'
import { stripExtension } from '@components/utils'
import { getFiles } from './get-all-files'
import { PostMetadata } from '@components/types'

const postsDir = constants.paths.posts

type PostData = GrayMatterFile<string> & {
  data: PostMetadata
}

export async function getPostByFilename(f: string): Promise<PostData> {
  return new Promise((res, rej) => {
    const post = getFiles(postsDir).find((t) => stripExtension(t) === f)
    if (!post) {
      return rej('post not found')
    }

    // use gray-matter to parse the frontmatter in the blog post
    const parsed = matter(readFileSync(resolve(postsDir, post), 'utf8'))
    return res(parsed as PostData)
  })
}
