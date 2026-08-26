import { Card, Skeleton } from '@/src/shared/ui'

export const KanbanColumnSkeleton = ({ count }: { count: number }) => {
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
