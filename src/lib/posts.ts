import { readFileSync } from 'fs'
import { resolve } from 'path'
import matter, { GrayMatterFile } from 'gray-matter'
import { constants } from '@lib/constants'
import { stripExtension } from '@utils'
import { getFiles } from './get-files'
import { PostMetadata } from '@types'

const postsDir = constants.paths.posts

type PostData = GrayMatterFile<string> & {
  data: PostMetadata
}

/**
 * takes in a url slug and searches the posts directory for a file with the same
 * name (excluding the file extension)
 *
 * @param {string} slug
 * @returns {Promise<PostData>}
 */
export async function getPostBySlug(slug: string): Promise<PostData> {
  return new Promise((res, rej) => {
    const post = getFiles(postsDir).find((t) => stripExtension(t) === slug)
    if (!post) return rej('post not found')

    // use gray-matter to parse the frontmatter in the blog post
    const parsed = matter(readFileSync(resolve(postsDir, post), 'utf8'))
    return res(parsed as PostData)
  })
}
