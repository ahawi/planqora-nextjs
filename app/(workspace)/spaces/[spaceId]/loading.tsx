import { SpaceRouteSkeleton } from '@/src/widgets/workspace-skeletons'

export default function SpaceLoading() {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <SpaceRouteSkeleton />
    </div>
  )
}
