'use client'

import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { type ChangeEvent, useState } from 'react'

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
import { useTaskFilters } from '@/src/features/task-filters'
import { Button, Chip, Progress, Select } from '@/src/shared/ui'

import { columns } from '../model/columns'
import { KanbanColumn } from './kanban-column'

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState(tasksMock)
  const [createTaskStatus, setCreateTaskStatus] = useState<
    Task['status'] | null
  >(null)
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null)
  const [taskIdToEdit, setTaskIdToEdit] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

  const taskToDelete = tasks.find((task) => task.id === taskIdToDelete) ?? null
  const taskToEdit = tasks.find((task) => task.id === taskIdToEdit) ?? null

  const {
    searchQuery,
    setSearchQuery,
    visibleTasks,
    selectedCategories,
    addCategory,
    removeCategory,
  } = useTaskFilters(tasks)

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

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchToggle = () => {
    if (searchOpen) {
      setSearchQuery('')
    }
    setSearchOpen((currentValue) => !currentValue)
  }

  const handleFiltersToggle = () => {
    setFiltersOpen((currentValue) => !currentValue)
  }

  const handleChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    addCategory(event.target.value)
  }

  const handleRemoveCategory = (category: Task['tag']) => {
    removeCategory(category)
  }

  const handleRemoveAllCategories = () => {
    selectedCategories.forEach((category) => removeCategory(category))
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
              value={searchQuery}
              onChange={handleSearchInput}
              aria-label="Поиск задач"
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
              aria-controls="kanban-search-panel"
              aria-expanded={searchOpen}
              className="max-[520px]:h-9 max-[520px]:px-2 max-[520px]:text-xs min-[701px]:hidden"
              onClick={handleSearchToggle}
              variant="secondary"
            >
              <MagnifyingGlassIcon />
              Поиск
            </Button>
            <Button
              className="max-[520px]:h-9 max-[520px]:px-2 max-[520px]:text-xs"
              variant="secondary"
              onClick={handleFiltersToggle}
              aria-expanded={filtersOpen}
              aria-controls="kanban-filters-panel"
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

        {searchOpen && (
          <label
            className="mt-4 hidden h-11 w-full items-center gap-3 rounded-xl border-2 border-primary-200 bg-primary-0 px-3 text-secondary-300 transition-colors focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100 max-[700px]:flex max-[520px]:mt-3"
            id="kanban-search-panel"
          >
            <MagnifyingGlassIcon className="size-5 shrink-0" />
            <input
              autoFocus
              aria-label="Мобильный поиск задач"
              className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-secondary-500 outline-none placeholder:text-secondary-300"
              onChange={handleSearchInput}
              placeholder="Найти задачу"
              type="search"
              value={searchQuery}
            />
          </label>
        )}

        {filtersOpen && (
          <section
            aria-labelledby="kanban-filters-title"
            className="mt-4 grid gap-4 rounded-2xl border border-border bg-surface-muted p-4 max-[520px]:mt-3 max-[520px]:gap-3 max-[520px]:p-3"
            id="kanban-filters-panel"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  className="text-sm font-bold text-secondary-500"
                  id="kanban-filters-title"
                >
                  Фильтры задач
                </h2>
                <p className="mt-1 text-xs text-secondary-400">
                  Выберите категории, которые хотите показать
                </p>
              </div>

              <Button
                disabled={selectedCategories.length === 0}
                size="sm"
                type="button"
                variant="minimal"
                onClick={handleRemoveAllCategories}
              >
                Сбросить все
              </Button>
            </div>

            <div className="grid grid-cols-[minmax(180px,240px)_1fr] items-end gap-4 max-[620px]:grid-cols-1 max-[620px]:items-stretch">
              <label className="grid gap-2">
                <span className="text-xs font-bold text-secondary-500">
                  Категория
                </span>
                <Select
                  value=""
                  onChange={handleChangeCategory}
                  aria-label="Добавить категорию"
                  size="md"
                >
                  <option value="">Все категории</option>
                  <option value="Дизайн">Дизайн</option>
                  <option value="Разработка">Разработка</option>
                  <option value="Исследование">Исследование</option>
                  <option value="UX">UX</option>
                  <option value="Вёрстка">Вёрстка</option>
                </Select>
              </label>

              <div className="grid gap-2">
                <span className="text-xs font-bold text-secondary-500">
                  Выбрано
                </span>
                <div
                  aria-label="Выбранные категории Kanban"
                  aria-live="polite"
                  className="flex min-h-10 flex-wrap items-center gap-2 rounded-xl border border-border bg-primary-0 px-3 py-1.5"
                >
                  {selectedCategories.length > 0 ? (
                    selectedCategories.map((category) => (
                      <Chip
                        key={category}
                        onRemove={() => handleRemoveCategory(category)}
                        removeLabel={`Удалить категорию ${category}`}
                      >
                        {category}
                      </Chip>
                    ))
                  ) : (
                    <span className="text-xs text-secondary-300">
                      Фильтры не выбраны
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
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

            const columnTasks = visibleTasks.filter(
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
