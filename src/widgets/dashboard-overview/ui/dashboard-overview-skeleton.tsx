import { Card, Skeleton } from '@/src/shared/ui'

export const DashboardOverviewSkeleton = () => {
  return (
    <section
      role="status"
      className="mb-10 grid grid-cols-[220px_minmax(0,1fr)] gap-6 [@media(max-height:950px)]:mb-5 max-[860px]:mb-[34px] max-[860px]:grid-cols-1 max-[860px]:gap-[30px]"
    >
      <Card className="min-h-[238px] border-0 bg-secondary-500 p-[26px] [@media(max-height:950px)]:min-h-[190px] [@media(max-height:950px)]:p-5 max-[860px]:min-h-[124px] max-[860px]:p-5">
        <Skeleton className="h-4 w-32 bg-primary-0" />
        <Skeleton className="my-[26px] h-12 w-16 bg-primary-0 [@media(max-height:950px)]:my-3" />
        <div className="flex items-center gap-4 max-[860px]:float-right max-[860px]:-mt-1">
          <Skeleton className="size-[76px] bg-primary-500 max-[860px]:size-[70px]" />
          <div>
            <Skeleton className="h-6 w-10 bg-primary-0" />
            <Skeleton className="mt-2 h-3 w-20 bg-primary-0" />
          </div>
        </div>
      </Card>
      <Card className="border-0 bg-surface-muted p-[26px] [@media(max-height:950px)]:p-5 max-[860px]:p-5">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="mt-[22px] h-[150px] rounded-[14px] bg-primary-0 [@media(max-height:950px)]:mt-3 [@media(max-height:950px)]:h-[120px] max-[860px]:mt-4 max-[860px]:h-[130px]" />
      </Card>

      <span className="sr-only">Загрузка статистики...</span>
    </section>
  )
}
