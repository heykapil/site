import { constants } from '@lib/constants'
import { getFiles } from '@lib/get-files'
import { readFileSync } from 'fs'
import { GetStaticProps } from 'next'
import { resolve } from 'path'
import Image from 'next/image'
import { getDate } from '@lib/utils'

const Photo = (p: { src: string; meta?: string }) => {
  const date = new Date(p.src.split('-').slice(0, 3).join('-'))
  return (
    <div className="w-full mb-12">
      <div className="block w-full">
        <Image
          src={'/photos/' + p.src}
          width={700} // will be overridden by layout="responsive"
          height={475} // will be overridden by layout="responsive"
          objectFit="cover"
          layout="responsive"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg">{p.meta ? p.meta : 'A cool photo.'}</h2>
        {date ? <span className="text-sm text-gray-500">{getDate(date)}</span> : null}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const dir = constants.paths.photos
  const photos = getFiles(dir)
    .filter((x) => !x.endsWith('.json'))
    .reverse()
  const meta = JSON.parse(readFileSync(resolve(dir, 'meta.json'), 'utf8'))
  return { props: { photos, meta } }
}

export default function Photos(p: {
  photos: string[]
  meta: Record<string, string>
}) {
  return (
    <div className="mb-24">
      {p.photos.map((src, i) => (
        <Photo key={i} src={src} meta={p.meta[src]} />
      ))}
    </div>
  )
}
