import { Skeleton } from '@/src/shared/ui'

import { KanbanColumnSkeleton } from './kanban-column-skeleton'

export const SpaceRouteSkeleton = () => {
  return (
    <section
      className="flex h-full min-h-0 flex-col overflow-hidden"
      role="status"
    >
      <header className="shrink-0 border-b border-border px-[clamp(20px,3vw,36px)] py-5 max-[860px]:px-[clamp(20px,7vw,32px)]">
        <div className="mb-8 flex items-center justify-between gap-6">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-[310px] rounded-xl max-[700px]:hidden" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-52" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
            <div className="mt-5 flex gap-6">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl bg-primary-500" />
          </div>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden bg-primary-0 px-[clamp(20px,3vw,36px)] py-7 max-[860px]:px-[clamp(20px,7vw,32px)]">
        <div className="grid min-w-max grid-flow-col gap-4 min-[1280px]:min-w-0 min-[1280px]:grid-flow-row min-[1280px]:grid-cols-4">
          {[2, 2, 3, 1].map((count, index) => (
            <KanbanColumnSkeleton count={count} key={index} />
          ))}
        </div>
      </div>
      <span className="sr-only">Загружаем пространство…</span>
    </section>
  )
}
