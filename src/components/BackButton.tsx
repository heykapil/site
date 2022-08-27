import { cc } from '@components/utils'
import { ArrowLeftIcon } from '@primer/octicons-react'

export const BackButton = (p: JSX.IntrinsicElements['div']) => {
  return (
    <div
      {...p}
      className={cc(
        'h-7 w-7 bg-gray-100 rounded-full',
        'flex items-center justify-center',
        'cursor-pointer',
        'active:bg-gray-200'
      )}
    >
      <ArrowLeftIcon className="fill-gray-500" size={20} />
    </div>
  )
}
