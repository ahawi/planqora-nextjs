import type { Task } from '@/src/entities/task'

import { TaskContent } from './task-content'
import { TaskDetailsHeader } from './task-details-header'
import { TaskProperties } from './task-properties'

export function TaskDetails({ task }: { task: Task }) {
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden">
      <TaskDetailsHeader task={task} />
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_360px] items-start gap-6 overflow-y-auto bg-surface-muted px-[clamp(20px,3vw,36px)] py-8 max-[1100px]:grid-cols-1 max-[860px]:px-[clamp(20px,7vw,32px)]">
        <TaskContent task={task} />
        <TaskProperties task={task} />
      </div>
    </section>
  )
}
