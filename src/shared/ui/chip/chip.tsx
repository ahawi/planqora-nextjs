import { XMarkIcon } from '@heroicons/react/20/solid'
import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/src/shared/lib'

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  onRemove?: () => void
  removeLabel?: string
}

export const Chip = ({
  children,
  className,
  onRemove,
  removeLabel = 'Удалить',
  ...props
}: ChipProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-8 items-center gap-1.5 rounded-full border border-primary-200 bg-primary-100 px-3 text-sm font-medium text-primary-700',
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          aria-label={removeLabel}
          className="-mr-1 inline-flex size-5 items-center justify-center rounded-full text-primary-600 transition-colors hover:bg-primary-200 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          type="button"
          onClick={onRemove}
        >
          <XMarkIcon aria-hidden="true" className="size-4" />
        </button>
      )}
    </span>
  )
}
