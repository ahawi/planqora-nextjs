import { Card, Skeleton } from '@/src/shared/ui'

import { OverviewAsideSkeleton } from './overview-aside-skeleton'
import { PageHeadingSkeleton } from './page-heading-skeleton'
import { SpaceCardSkeleton } from './space-card-skeleton'
import { TaskCardSkeleton } from './task-card-skeleton'

export const OverviewRouteSkeleton = () => {
  return (
    <div
      className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_360px] overflow-hidden max-[1180px]:block"
      role="status"
    >
      <main className="min-w-0 overflow-hidden px-[clamp(20px,3vw,36px)] pb-[clamp(36px,4vw,48px)] pt-[clamp(26px,3vw,38px)] [@media(max-height:950px)]:pb-5 [@media(max-height:950px)]:pt-5 max-[860px]:px-[clamp(20px,7vw,32px)] max-[860px]:pb-12 max-[860px]:pt-8">
        <PageHeadingSkeleton className="mb-[42px] [@media(max-height:950px)]:mb-5 max-[860px]:mb-[30px]" />

        <section className="mb-10 grid grid-cols-[220px_minmax(0,1fr)] gap-6 [@media(max-height:950px)]:mb-5 max-[860px]:mb-[34px] max-[860px]:grid-cols-1 max-[860px]:gap-[30px]">
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
        </section>

        <section className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]">
          <div className="mb-4 flex justify-between">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <SpaceCardSkeleton key={index} />
            ))}
          </div>
        </section>
        <section className="mt-[38px] [@media(max-height:950px)]:mt-5 max-[860px]:mt-[34px]">
          <div className="mb-4 flex justify-between">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="grid grid-cols-2 gap-[18px]">
            {Array.from({ length: 2 }).map((_, index) => (
              <TaskCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </main>
      <OverviewAsideSkeleton />
      <span className="sr-only">Загружаем обзор…</span>
    </div>
  )
}
