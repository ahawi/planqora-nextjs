import { OverviewRouteSkeleton } from '@/src/widgets/workspace-skeletons'

const WorkspaceLoading = () => {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <OverviewRouteSkeleton />
    </div>
  )
}

export default WorkspaceLoading
