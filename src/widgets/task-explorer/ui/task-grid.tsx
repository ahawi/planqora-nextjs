import { TaskCard, tasksMock } from '@/src/entities/task'

export const TaskGrid = ({ tasks }: { tasks: typeof tasksMock }) => {
  return (
    <div className="grid grid-cols-3 gap-5 max-[1180px]:grid-cols-2 max-[620px]:grid-cols-1">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
