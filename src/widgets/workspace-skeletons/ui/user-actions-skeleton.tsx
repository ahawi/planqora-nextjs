import { Skeleton } from '@/src/shared/ui'

export const UserActionsSkeleton = () => {
  return (
    <div className="flex gap-3 max-[860px]:hidden">
      <Skeleton className="size-10" />
      <Skeleton className="size-10" />
    </div>
  )
}
