import { Skeleton } from '@/src/shared/ui'

export const ConversationSkeleton = ({
  active = false,
}: {
  active?: boolean
}) => {
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
