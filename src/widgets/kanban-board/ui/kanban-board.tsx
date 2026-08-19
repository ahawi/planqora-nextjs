'use client'

import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

import { type Task, tasksMock, updateTaskStatus } from '@/src/entities/task'
import { formatTaskCount } from '@/src/entities/task'
import {
  createTask,
  CreateTaskDialog,
  CreateTaskForm,
  type CreateTaskInput,
} from '@/src/features/create-task'
import { Button, Progress } from '@/src/shared/ui'

import { columns } from '../model/columns'
import { KanbanColumn } from './kanban-column'

export function KanbanBoard() {
  const [tasks, setTasks] = useState(tasksMock)
  const [createTaskStatus, setCreateTaskStatus] = useState<
    Task['status'] | null
  >(null)

  const handleTaskStatusChange = (
    taskId: string,
    newStatus: Task['status'],
  ) => {
    setTasks((currentTasks) =>
      updateTaskStatus(currentTasks, taskId, newStatus),
    )
  }

  const handleCreateTask = (input: CreateTaskInput) => {
    const newTask = createTask(input, crypto.randomUUID())

    setTasks((currentTasks) => {
      return [...currentTasks, newTask]
    })

    setCreateTaskStatus(null)
  }

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden">
      <header className="shrink-0 border-b border-border px-[clamp(20px,3vw,36px)] py-5 max-[860px]:px-[clamp(20px,7vw,32px)]">
        <div className="mb-8 flex items-center justify-between gap-6">
          <p className="text-sm text-secondary-400">
            <span className="max-[520px]:hidden">
              Пространства&nbsp; / &nbsp;
            </span>
            <strong className="font-semibold text-secondary-500">
              Редизайн сайта
            </strong>
          </p>
          <label className="flex h-10 w-[310px] items-center gap-2 rounded-xl border border-border px-3 text-secondary-300 max-[700px]:hidden">
            <MagnifyingGlassIcon className="size-5" />
            <input
              className="w-full border-0 bg-transparent p-0 text-sm outline-none ring-0 placeholder:text-secondary-300 focus:ring-0"
              placeholder="Поиск"
              type="search"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.04em]">
                Редизайн сайта
              </h1>
              <Button size="sm" variant="secondary">
                ● В работе
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-6 text-xs text-secondary-400">
              <span>▣ &nbsp;{formatTaskCount(tasks.length)}</span>
              <span>♙ &nbsp;3 участника</span>
              <div className="flex items-center gap-3">
                <span className="text-secondary-500">67% готово</span>
                <Progress className="w-36" value={67} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">
              <MagnifyingGlassIcon />
              Поиск
            </Button>
            <Button variant="secondary">
              <AdjustmentsHorizontalIcon />
              Фильтры
            </Button>
            <Button variant="secondary">
              <UserGroupIcon />
              Участники
            </Button>
            <Button onClick={() => setCreateTaskStatus('backlog')}>
              <PlusIcon />
              Новая задача
            </Button>
          </div>
        </div>
      </header>

      {createTaskStatus !== null && (
        <CreateTaskDialog onClose={() => setCreateTaskStatus(null)}>
          <CreateTaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setCreateTaskStatus(null)}
            initialStatus={createTaskStatus}
          />
        </CreateTaskDialog>
      )}

      <div className="min-h-0 flex-1 overflow-auto bg-primary-0 px-[clamp(20px,3vw,36px)] py-7 max-[860px]:px-[clamp(20px,7vw,32px)] [scrollbar-width:thin]">
        <div className="grid min-w-max grid-flow-col gap-4 min-[1280px]:min-w-0 min-[1280px]:grid-flow-row min-[1280px]:grid-cols-4">
          {columns.map((column, idx) => {
            const nextStatus = columns[idx + 1]?.id

            const columnTasks = tasks.filter(
              (task) => task.status === column.id,
            )

            return (
              <KanbanColumn
                key={column.id}
                nextStatus={nextStatus}
                onTaskStatusChange={handleTaskStatusChange}
                tasks={columnTasks}
                title={column.title}
                onAddTask={() => setCreateTaskStatus(column.id)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
