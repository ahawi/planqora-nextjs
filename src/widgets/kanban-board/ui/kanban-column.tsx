import { PlusIcon } from '@heroicons/react/24/outline'

import { KanbanTaskCard, type Task } from '@/src/entities/task'
import { Button } from '@/src/shared/ui'

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  nextStatus?: Task['status']
  onTaskStatusChange: (taskId: string, newStatus: Task['status']) => void
}

export const KanbanColumn = ({
  title,
  tasks,
  nextStatus,
  onTaskStatusChange,
}: KanbanColumnProps) => {
  return (
    <section className="flex min-h-[610px] w-[290px] shrink-0 flex-col rounded-2xl border border-border bg-surface-muted p-3 min-[1280px]:w-auto min-[1280px]:min-w-0">
      <header className="mb-3 flex items-center justify-between px-1 py-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold">{title}</h2>
          <span className="grid size-6 place-items-center rounded-lg bg-primary-0 text-[11px] text-secondary-400">
            {tasks.length}
          </span>
        </div>
        <Button
          aria-label={`Меню колонки ${title}`}
          iconOnly
          size="sm"
          variant="minimal"
        >
          •••
        </Button>
      </header>
      <div className="grid gap-3">
        {tasks.map((task) => (
          <div className="grid gap-2" key={task.id}>
            <KanbanTaskCard task={task} />

            {nextStatus && (
              <Button
                onClick={() => onTaskStatusChange(task.id, nextStatus)}
                size="sm"
                variant="secondary"
                aria-label={`Переместить задачу ${task.title} дальше`}
              >
                Переместить дальше
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button className="mt-auto w-full justify-start" variant="minimal">
        <PlusIcon />
        Добавить задачу
      </Button>
    </section>
  )
}
