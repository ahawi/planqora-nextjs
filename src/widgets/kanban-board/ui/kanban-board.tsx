'use client'

import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

import {
  deleteTask,
  formatTaskCount,
  type Task,
  tasksMock,
  updateTask,
  updateTaskStatus,
} from '@/src/entities/task'
import {
  createTask,
  CreateTaskDialog,
  CreateTaskForm,
  type CreateTaskInput,
} from '@/src/features/create-task'
import { DeleteTaskDialog } from '@/src/features/delete-task'
import {
  EditTaskDialog,
  EditTaskForm,
  type EditTaskInput,
} from '@/src/features/edit-task'
import { Button, Progress } from '@/src/shared/ui'

import { columns } from '../model/columns'
import { KanbanColumn } from './kanban-column'

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState(tasksMock)
  const [createTaskStatus, setCreateTaskStatus] = useState<
    Task['status'] | null
  >(null)
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null)
  const [taskIdToEdit, setTaskIdToEdit] = useState<string | null>(null)

  const taskToDelete = tasks.find((task) => task.id === taskIdToDelete) ?? null
  const taskToEdit = tasks.find((task) => task.id === taskIdToEdit) ?? null

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

  const handleDeleteRequest = (taskId: string) => {
    setTaskIdToDelete(taskId)
  }

  const handleConfirmDelete = () => {
    if (!taskIdToDelete) return

    setTasks((currentTasks) => deleteTask(currentTasks, taskIdToDelete))
    setTaskIdToDelete(null)
  }

  const handleEditRequest = (taskId: string) => {
    setTaskIdToEdit(taskId)
  }

  const handleCreateBacklogTask = () => {
    setCreateTaskStatus('backlog')
  }

  const handleCloseCreateTask = () => {
    setCreateTaskStatus(null)
  }

  const handleCancelDelete = () => {
    setTaskIdToDelete(null)
  }

  const handleCloseEdit = () => {
    setTaskIdToEdit(null)
  }

  const handleEditTask = (input: EditTaskInput) => {
    if (!taskIdToEdit) return

    setTasks((currentTasks) => updateTask(currentTasks, taskIdToEdit, input))
    setTaskIdToEdit(null)
  }

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden">
      <header className="shrink-0 border-b border-border px-[clamp(20px,3vw,36px)] py-5 max-[860px]:px-[clamp(20px,7vw,32px)] max-[520px]:px-4 max-[520px]:py-3.5">
        <div className="mb-8 flex items-center justify-between gap-6 max-[520px]:hidden">
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
        <div className="flex flex-wrap items-center justify-between gap-5 max-[520px]:gap-3">
          <div>
            <div className="flex items-center gap-3 max-[520px]:gap-2">
              <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.04em] max-[520px]:text-xl">
                Редизайн сайта
              </h1>
              <Button
                className="max-[520px]:h-7 max-[520px]:px-2 max-[520px]:text-[11px]"
                size="sm"
                variant="secondary"
              >
                ● В работе
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-6 text-xs text-secondary-400 max-[520px]:mt-3 max-[520px]:gap-2 max-[520px]:text-[11px]">
              <span>▣ &nbsp;{formatTaskCount(tasks.length)}</span>
              <span>♙ &nbsp;3 участника</span>
              <div className="flex items-center gap-3 max-[520px]:gap-2">
                <span className="text-secondary-500">67% готово</span>
                <Progress className="w-36 max-[520px]:w-16" value={67} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 max-[520px]:grid max-[520px]:w-full max-[520px]:grid-cols-2">
            <Button
              className="max-[520px]:h-9 max-[520px]:px-2 max-[520px]:text-xs"
              variant="secondary"
            >
              <MagnifyingGlassIcon />
              Поиск
            </Button>
            <Button
              className="max-[520px]:h-9 max-[520px]:px-2 max-[520px]:text-xs"
              variant="secondary"
            >
              <AdjustmentsHorizontalIcon />
              Фильтры
            </Button>
            <Button
              className="max-[520px]:h-9 max-[520px]:px-2 max-[520px]:text-xs"
              variant="secondary"
            >
              <UserGroupIcon />
              Участники
            </Button>
            <Button
              className="max-[520px]:h-9 max-[520px]:px-2 max-[520px]:text-xs"
              onClick={handleCreateBacklogTask}
            >
              <PlusIcon />
              Новая задача
            </Button>
          </div>
        </div>
      </header>

      {createTaskStatus !== null && (
        <CreateTaskDialog onClose={handleCloseCreateTask}>
          <CreateTaskForm
            onSubmit={handleCreateTask}
            onCancel={handleCloseCreateTask}
            initialStatus={createTaskStatus}
          />
        </CreateTaskDialog>
      )}

      {taskToDelete !== null && (
        <DeleteTaskDialog
          taskTitle={taskToDelete.title}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="min-h-0 flex-1 overflow-auto bg-primary-0 px-[clamp(20px,3vw,36px)] py-7 max-[860px]:px-[clamp(20px,7vw,32px)] max-[520px]:px-4 max-[520px]:py-3 [scrollbar-width:thin]">
        <div className="grid min-w-max grid-flow-col gap-4 max-[520px]:gap-3 min-[1280px]:min-w-0 min-[1280px]:grid-flow-row min-[1280px]:grid-cols-4">
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
                onDeleteRequest={handleDeleteRequest}
                onEditRequest={handleEditRequest}
              />
            )
          })}
        </div>
      </div>

      {taskToEdit !== null && (
        <EditTaskDialog onClose={handleCloseEdit}>
          <EditTaskForm
            task={taskToEdit}
            onSubmit={handleEditTask}
            onCancel={handleCloseEdit}
          />
        </EditTaskDialog>
      )}
    </section>
  )
}
