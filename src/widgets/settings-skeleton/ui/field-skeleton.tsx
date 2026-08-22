import { Skeleton } from '@/src/shared/ui'

export const FieldSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-3 h-4 w-36" />
      <div className="flex h-14 items-center justify-between rounded-xl border border-border px-5">
        <Skeleton className="h-3 w-36 bg-primary-100" />
        <Skeleton className="size-5" />
      </div>
    </div>
  )
}
