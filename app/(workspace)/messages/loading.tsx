import { MessagesSkeleton } from '@/src/widgets/messages-skeleton'

export default function MessagesLoading() {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <MessagesSkeleton />
    </div>
  )
}
