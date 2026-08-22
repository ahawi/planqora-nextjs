import { Skeleton } from '@/src/shared/ui'

import { PageHeadingSkeleton } from './page-heading-skeleton'
import { TaskCardSkeleton } from './task-card-skeleton'

export const TasksRouteSkeleton = () => {
  return (
    <section
      className="flex h-full min-h-0 flex-col overflow-hidden"
      role="status"
    >
      <div className="shrink-0 px-[clamp(20px,3vw,36px)] pt-[clamp(26px,3vw,38px)] max-[860px]:px-[clamp(20px,7vw,32px)]">
        <PageHeadingSkeleton className="mb-[42px] [@media(max-height:950px)]:mb-5 max-[860px]:mb-[30px]" />
        <div className="mb-8 flex items-center gap-4 max-[720px]:flex-wrap">
          <Skeleton className="h-12 min-w-[260px] flex-1 rounded-xl bg-primary-0" />
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden bg-surface-muted px-[clamp(20px,3vw,36px)] py-8 max-[860px]:px-[clamp(20px,7vw,32px)]">
        {[0, 1].map((section) => (
          <section className={section ? 'mt-12' : ''} key={section}>
            <div className="mb-4 flex justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="grid grid-cols-3 gap-5 max-[1180px]:grid-cols-2 max-[620px]:grid-cols-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <TaskCardSkeleton key={index} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <span className="sr-only">Загружаем задачи…</span>
    </section>
  )
}
