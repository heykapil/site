import { stripExtension } from '@components/utils'
import { constants } from '@lib/constants'
import { getFiles } from '@lib/get-all-files'
import { readFileSync } from 'fs'
import { GetStaticProps } from 'next'
import { resolve } from 'path'
import Image from 'next/image'

const Photo = (p: { src: string; meta?: string }) => (
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
    <div className="flex">
      <span className="mx-auto">{p.meta ? p.meta : 'A cool photo.'}</span>
    </div>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  const photos = getFiles(constants.paths.photos).filter(
    (x) => !x.endsWith('.json')
  )
  const meta = JSON.parse(
    readFileSync(resolve(constants.paths.photos, 'meta.json'), 'utf8')
  )
  return { props: { photos, meta } }
}

export default function Photos(p: {
  photos: string[]
  meta: Record<string, string>
}) {
  return (
    <div className="mb-24">
      {p.photos.map((src, i) => (
        <Photo key={i} src={src} meta={p.meta[stripExtension(src)]} />
      ))}
    </div>
  )
}
