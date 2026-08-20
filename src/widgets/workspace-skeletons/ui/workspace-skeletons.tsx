import { Card, Skeleton } from '@/src/shared/ui'

const UserActionsSkeleton = () => {
  return (
    <div className="flex gap-3 max-[860px]:hidden">
      <Skeleton className="size-10" />
      <Skeleton className="size-10" />
    </div>
  )
}

const PageHeadingSkeleton = ({ className = '' }: { className?: string }) => {
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

const TaskCardSkeleton = () => {
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

const SpaceCardSkeleton = () => {
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

const OverviewAsideSkeleton = () => {
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

const KanbanColumnSkeleton = ({ count }: { count: number }) => {
  return (
    <section className="flex min-h-[610px] w-[290px] shrink-0 flex-col rounded-2xl border border-border bg-surface-muted p-3 min-[1280px]:w-auto min-[1280px]:min-w-0">
      <header className="mb-3 flex items-center justify-between px-1 py-1">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="size-6" />
        </div>
        <Skeleton className="size-8" />
      </header>
      <div className="grid gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <Card className="border-0 bg-primary-0 p-4" key={index}>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-3 h-3 w-1/2 bg-primary-100" />
            <Skeleton className="mt-6 h-2 w-full" />
            <div className="mt-4 flex justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </Card>
        ))}
      </div>
      <Skeleton className="mt-auto h-10 w-full rounded-xl" />
    </section>
  )
}

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
