import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/src/shared/lib'

interface EmptyStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  action?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  title: ReactNode
}

export const EmptyState = ({
  action,
  className,
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      aria-live="polite"
      className={cn(
        'flex min-h-72 w-full flex-col items-center justify-center rounded-2xl border border-border bg-primary-0 px-6 py-12 text-center',
        className,
      )}
      role="status"
      {...props}
    >
      {icon && (
        <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary-100 text-primary-500 [&_svg]:size-7">
          {icon}
        </div>
      )}
      <h2 className="text-xl font-semibold text-secondary-500">{title}</h2>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-secondary-300">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
