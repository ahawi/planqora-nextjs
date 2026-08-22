import { Skeleton } from '@/src/shared/ui'

import { UserActionsSkeleton } from './user-actions-skeleton'

export const PageHeadingSkeleton = ({
  className = '',
}: {
  className?: string
}) => {
  return (
    <div className={`flex items-center justify-between gap-6 ${className}`}>
      <div>
        <Skeleton className="h-7 w-40" />
        <Skeleton className="mt-1.5 h-3.5 w-56 bg-primary-100" />
      </div>
      <UserActionsSkeleton />
    </div>
  )
}
