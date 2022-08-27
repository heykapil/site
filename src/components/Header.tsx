import { cc } from '@components/utils'
import constants from '@lib/constants.json'
import { TelescopeIcon } from '@primer/octicons-react'
import { NextRouter } from 'next/router'
import { BackButton } from './BackButton'

const Name = (p: { className?: string }) => (
  <span className={cc('font-readex text-[1.125em] text-gray-500', p.className)}>
    {constants.name}
  </span>
)

const Container = (p: JSX.IntrinsicElements['div']) => (
  <div className="w-full flex items-center">{p.children}</div>
)

export const Header = (p: { router: NextRouter }) => {
  const { router } = p
  const RootHeader = () => (
    <div className="flex flex-col mt-12 mb-10">
      <TelescopeIcon size={32} className="fill-gray-400" />
      <div className="h-2" />
      <Name className="text-[1.2em] text-gray-900" />
    </div>
  )
  const NonRootHeader = () => (
    <div className="mt-12 mb-6 flex items-center">
      <BackButton onClick={() => router.replace('/')} />
      <div className="w-4" />
      <Name />
    </div>
  )
  return (
    <Container>
      {router.route === '/' ? <RootHeader /> : <NonRootHeader />}
    </Container>
  )
}
