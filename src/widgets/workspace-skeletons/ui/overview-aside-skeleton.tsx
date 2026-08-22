import { Card, Skeleton } from '@/src/shared/ui'

export const OverviewAsideSkeleton = () => {
  return (
    <aside className="min-w-0 overflow-hidden bg-surface-muted px-7 py-[38px] max-[1180px]:grid max-[1180px]:grid-cols-[1fr_1.3fr] max-[1180px]:gap-5 max-[1180px]:bg-primary-0 max-[1180px]:pt-0 max-[860px]:grid-cols-1 max-[860px]:gap-7 max-[860px]:bg-surface-subtle max-[860px]:px-[clamp(20px,7vw,32px)] max-[860px]:py-6">
      <Card className="border-0 px-5 pb-5 pt-6">
        <div className="mb-[22px] flex items-center justify-between">
          <Skeleton className="size-8" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="size-8" />
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <div className="grid justify-items-center gap-2" key={index}>
              <Skeleton className="h-3 w-5" />
              <Skeleton className="size-[34px]" />
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-6 border-0 p-[25px] max-[1180px]:mt-0">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="size-8" />
        </div>
        <Skeleton className="mt-5 min-h-[150px] rounded-[14px] bg-primary-100" />
        <div className="mt-5 flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="mt-2.5 h-2 w-full" />
        <div className="mt-[18px] flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="mt-6 border-t border-border pt-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="mt-2.5 flex items-center gap-3" key={index}>
              <Skeleton className="size-[34px] rounded-lg" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-6 h-12 rounded-xl bg-primary-500" />
      </Card>
    </aside>
  )
}
