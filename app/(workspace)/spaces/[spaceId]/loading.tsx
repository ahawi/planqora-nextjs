import { SpaceRouteSkeleton } from '@/src/widgets/workspace-skeletons'

const SpaceLoading = () => {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <SpaceRouteSkeleton />
    </div>
  )
}

export default SpaceLoading
