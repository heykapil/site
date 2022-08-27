import { cc } from '@components/utils'
import { Children } from './types'

const Base = (className?: string) => (p: { children?: Children }) =>
  (
    <div className="flex justify-center px-4 sm:px-10 md:px-20">
      <div className={cc(className)}>{p.children}</div>
    </div>
  )

type ContainerDict = {
  [key: string]: (_: { children?: Children }) => JSX.Element
}

export const Container: ContainerDict = {
  default: Base('w-full max-w-2xl'),
  ['/photos']: Base('w-full max-w-5xl'),
}
