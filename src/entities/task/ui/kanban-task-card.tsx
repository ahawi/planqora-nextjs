import {
  CalendarDaysIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { formatDeadline } from '@/src/shared/lib'
import { Button, Card } from '@/src/shared/ui'

import type { Task } from '../model/types'

const priorityStyles: Record<
  Task['priority'],
  { label: string; style: string }
> = {
  high: { label: 'Высокий', style: 'bg-error-100 text-error-700' },
  medium: { label: 'Средний', style: 'bg-warning-100 text-warning-800' },
  low: { label: 'Низкий', style: 'bg-success-100 text-success-800' },
}

export function KanbanTaskCard({ task }: { task: Task }) {
  const priority = priorityStyles[task.priority]

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug">
          <Link className="hover:text-primary-600" href={`/tasks/${task.id}`}>
            {task.title}
          </Link>
        </h3>
        <Button
          aria-label={`Меню задачи ${task.title}`}
          className="-mr-2 -mt-2"
          iconOnly
          size="sm"
          variant="minimal"
        >
          <EllipsisHorizontalIcon />
        </Button>
      </div>
      <span
        className={`mt-3 inline-flex rounded-lg px-2 py-1 text-[10px] font-bold ${priority.style}`}
      >
        ↑&nbsp; {priority.label}
      </span>
      <div className="mt-4 flex items-center gap-3 text-[11px] text-secondary-400">
        <span className="grid size-6 place-items-center rounded-full bg-secondary-400 text-[8px] font-bold text-primary-0">
          {task.assignee}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDaysIcon className="size-4" />
          {formatDeadline(task.deadline)}
        </span>
        <span className="flex items-center gap-1">
          <ChatBubbleOvalLeftIcon className="size-4" />
          {task.comments}
        </span>
      </div>
      <div className="mt-3 flex justify-end">
        <span className="rounded-lg bg-information-100 px-2 py-1 text-[10px] font-medium text-information-800">
          {task.tag}
        </span>
      </div>
    </Card>
  )
}
