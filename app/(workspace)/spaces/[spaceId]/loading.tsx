import { KanbanBoardSkeleton } from '@/src/widgets/kanban-board'

const SpaceLoading = () => {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <KanbanBoardSkeleton />
    </div>
  )
}

export default SpaceLoading
