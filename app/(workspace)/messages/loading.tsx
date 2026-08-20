import { MessagesSkeleton } from '@/src/widgets/messages-skeleton'

const MessagesLoading = () => {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <MessagesSkeleton />
    </div>
  )
}

export default MessagesLoading
