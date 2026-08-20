import { TasksRouteSkeleton } from '@/src/widgets/workspace-skeletons'

const TasksLoading = () => {
  return (
    <div className="h-full animate-[route-loading-reveal_120ms_ease-out_both]">
      <TasksRouteSkeleton />
    </div>
  )
}

export default TasksLoading
