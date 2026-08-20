import { Skeleton } from '@/src/shared/ui'

const FieldSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-3 h-4 w-36" />
      <div className="flex h-14 items-center justify-between rounded-xl border border-border px-5">
        <Skeleton className="h-3 w-36 bg-primary-100" />
        <Skeleton className="size-5" />
      </div>
    </div>
  )
}

export const SettingsSkeleton = () => {
  return (
    <section
      aria-label="Загружаем настройки"
      className="flex h-full min-h-0 flex-col overflow-hidden bg-surface-muted"
      role="status"
    >
      <header className="flex min-h-28 shrink-0 items-center justify-between border-b border-border bg-primary-0 px-9 max-[860px]:min-h-32 max-[860px]:items-end max-[860px]:border-b-0 max-[860px]:px-7 max-[860px]:pb-7">
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-3 max-[860px]:hidden">
          <Skeleton className="size-12" />
          <Skeleton className="size-12" />
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-9 max-[860px]:p-0">
        <div className="min-h-[650px] rounded-[18px] bg-primary-0 px-10 py-10 max-[860px]:min-h-0 max-[860px]:rounded-none max-[860px]:px-0 max-[860px]:py-0">
          <div className="flex gap-7 border-b border-border max-[860px]:px-7">
            <div className="border-b-2 border-primary-500 px-3 pb-4 max-[860px]:pb-5">
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="border-b-2 border-transparent px-3 pb-4 max-[860px]:pb-5">
              <Skeleton className="h-3 w-24 bg-primary-100" />
            </div>
          </div>

          <div className="max-[860px]:bg-surface-muted max-[860px]:p-7 max-[480px]:p-5">
            <div className="flex max-w-[510px] flex-col pt-9 max-[860px]:min-h-[calc(100vh-352px)] max-[860px]:max-w-none max-[860px]:rounded-2xl max-[860px]:bg-primary-0 max-[860px]:p-7 max-[480px]:p-5">
              <div className="space-y-8">
                <FieldSkeleton />
                <FieldSkeleton />

                <div>
                  <Skeleton className="mb-3 h-4 w-36" />
                  <div className="grid grid-cols-2 gap-4">
                    {[true, false].map((selected, index) => (
                      <div
                        className={`flex h-14 items-center justify-between rounded-xl border px-5 max-[420px]:px-3 ${selected ? 'border-primary-500' : 'border-border'}`}
                        key={index}
                      >
                        <Skeleton className="h-3 w-24 bg-primary-100" />
                        <Skeleton className="size-6 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Skeleton className="mt-12 h-12 w-[275px] max-w-full rounded-xl bg-primary-500 max-[860px]:mt-auto max-[860px]:w-full" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Загружаем настройки…</span>
    </section>
  )
}
