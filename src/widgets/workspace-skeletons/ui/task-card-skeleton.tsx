import { Card, Skeleton } from '@/src/shared/ui'

export const TaskCardSkeleton = () => {
  return (
    <Card className="snap-start p-3.5 [@media(max-height:950px)]:p-2.5">
      <Skeleton className="h-[clamp(125px,38vw,170px)] rounded-[14px] bg-primary-100 min-[861px]:h-[116px] [@media(max-height:950px)]:h-20" />
      <div className="mx-0.5">
        <Skeleton className="mb-1 mt-4 h-[18px] w-3/5 [@media(max-height:950px)]:mt-2" />
        <Skeleton className="h-3 w-2/5 bg-primary-100" />
        <div className="mt-[18px] flex justify-between [@media(max-height:950px)]:mt-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-9" />
        </div>
        <Skeleton className="mt-2.5 h-2 w-full" />
      </div>
      <div className="mx-0.5 mt-4 flex items-center justify-between [@media(max-height:950px)]:mt-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
    </Card>
  )
}
