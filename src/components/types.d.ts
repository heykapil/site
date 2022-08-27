import type { ReactElement } from 'react'

export type Children = ReactElement | ReactElement[] | null

export type PostMetadata = {
  title: string
  publishedAt: string
  tags: string[]
  summary: string
}
