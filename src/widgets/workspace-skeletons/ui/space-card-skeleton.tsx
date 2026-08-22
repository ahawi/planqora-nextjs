import { Card, Skeleton } from '@/src/shared/ui'

export const SpaceCardSkeleton = () => {
  return (
    <Card className="snap-start p-5 [@media(max-height:950px)]:p-3">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="size-11 rounded-[13px] [@media(max-height:950px)]:size-9" />
        <Skeleton className="size-8" />
      </div>
      <Skeleton className="mb-1 mt-[18px] h-[18px] w-3/5 [@media(max-height:950px)]:mt-2" />
      <Skeleton className="h-3 w-4/5 bg-primary-100" />
      <div className="mt-[19px] flex justify-between [@media(max-height:950px)]:mt-2">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-8" />
      </div>
      <Skeleton className="mt-2.5 h-2 w-full" />
    </Card>
  )
}
