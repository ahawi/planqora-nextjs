import type { HTMLAttributes } from 'react'

import { cn } from '@/src/shared/lib'

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'block animate-pulse rounded-full bg-primary-200',
        className,
      )}
      {...props}
    />
  )
}
