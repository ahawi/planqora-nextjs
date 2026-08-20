import { Skeleton } from '@/src/shared/ui'

const ConversationSkeleton = ({ active = false }: { active?: boolean }) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl p-3 max-[860px]:rounded-none max-[860px]:border-b max-[860px]:border-border max-[860px]:px-2 max-[860px]:py-5 ${active ? 'bg-surface-subtle' : ''}`}
    >
      <div className="grid size-12 shrink-0 place-items-center rounded-full border border-primary-300">
        <Skeleton className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-2 h-3 w-40 bg-primary-100" />
      </div>
    </div>
  )
}

export const MessagesSkeleton = () => {
  return (
    <section
      className="flex h-full min-h-0 flex-col overflow-hidden bg-primary-0"
      role="status"
    >
      <header className="flex min-h-28 shrink-0 items-center justify-between border-b border-border px-8 max-[860px]:min-h-32 max-[860px]:items-end max-[860px]:border-b-0 max-[860px]:px-7 max-[860px]:pb-7">
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-3 max-[860px]:hidden">
          <Skeleton className="size-12" />
          <Skeleton className="size-12" />
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[360px_minmax(0,1fr)] max-[1060px]:grid-cols-[310px_minmax(0,1fr)] max-[860px]:grid-cols-1">
        <aside className="flex min-h-0 flex-col overflow-hidden border-r border-border px-5 py-6 max-[860px]:border-r-0 max-[860px]:px-7 max-[860px]:pb-0 max-[860px]:pt-2 max-[480px]:px-5">
          <div className="flex h-12 shrink-0 items-center justify-between rounded-xl border border-border px-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="size-5" />
          </div>
          <div className="mt-5 min-h-0 flex-1 space-y-1 overflow-y-auto max-[860px]:space-y-0">
            {Array.from({ length: 8 }).map((_, index) => (
              <ConversationSkeleton active={index === 0} key={index} />
            ))}
          </div>
        </aside>

        <div className="flex min-h-0 flex-col max-[860px]:hidden">
          <header className="flex min-h-24 items-center justify-between border-b border-border px-8">
            <div className="flex items-center gap-3">
              <Skeleton className="size-12" />
              <div>
                <Skeleton className="h-3 w-32" />
                <Skeleton className="mt-2 h-3 w-24 bg-primary-100" />
              </div>
            </div>
            <div className="flex gap-3">
              <Skeleton className="size-12" />
              <Skeleton className="size-12" />
            </div>
          </header>
          <div className="flex flex-1 flex-col bg-surface-muted px-8 py-7">
            <Skeleton className="mx-auto h-9 w-20 rounded-xl" />
            <div className="mt-10 space-y-3 self-end">
              <Skeleton className="h-3 w-72" />
              <Skeleton className="h-3 w-72" />
              <Skeleton className="ml-auto h-3 w-16" />
            </div>
            <div className="mt-10 space-y-3">
              <Skeleton className="h-3 w-72 bg-primary-100" />
              <Skeleton className="h-3 w-72 bg-primary-100" />
              <Skeleton className="h-3 w-16 bg-primary-100" />
            </div>
            <div className="mt-12 self-end">
              <Skeleton className="h-52 w-72 rounded-2xl" />
              <Skeleton className="mt-3 h-3 w-72" />
              <Skeleton className="ml-auto mt-3 h-3 w-16" />
            </div>
          </div>
          <footer className="flex min-h-20 items-center justify-between border-t border-border px-8">
            <Skeleton className="h-3 w-28" />
            <div className="flex gap-3">
              <Skeleton className="size-5" />
              <Skeleton className="size-10 rounded-xl" />
            </div>
          </footer>
        </div>
      </div>
      <span className="sr-only">Загружаем сообщения…</span>
    </section>
  )
}
