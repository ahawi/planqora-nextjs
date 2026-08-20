import type { HTMLAttributes } from 'react'

import { cn } from '@/src/shared/lib'

export const Card = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <article
      className={cn(
        'rounded-[18px] border border-border bg-primary-0',
        className,
      )}
      {...props}
    />
  )
}

export const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('flex items-start justify-between gap-4', className)}
      {...props}
    />
  )
}

export const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn(className)} {...props} />
}

export const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('flex items-center justify-between', className)}
      {...props}
    />
  )
}
