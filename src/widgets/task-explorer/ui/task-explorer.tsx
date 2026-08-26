'use client'

import {
  DocumentMagnifyingGlassIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { type ChangeEvent, type ReactNode } from 'react'

import { type Task, useGetTasksQuery } from '@/src/entities/task'
import { type TaskSort, useTaskFilters } from '@/src/features/task-filters'
import { Chip, EmptyState, SectionHeading, Select } from '@/src/shared/ui'

import { TaskGrid } from './task-grid'

interface TaskExplorerProps {
  header: ReactNode
  loading: ReactNode
}

export const TaskExplorer = ({ header, loading }: TaskExplorerProps) => {
  const { data: tasks = [], isLoading, error } = useGetTasksQuery()
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    addCategory,
    removeCategory,
    visibleTasks,
    sortOrder,
    setSortOrder,
  } = useTaskFilters(tasks)

  const urgentTasks = visibleTasks.filter((task) => task.priority === 'high')
  const recentTasks = visibleTasks.filter((task) => task.priority !== 'high')

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    addCategory(event.target.value)
  }

  const handleCategoryRemove = (category: Task['tag']) => {
    removeCategory(category)
  }

  const handleSortTasks = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as TaskSort)
  }

  if (isLoading) {
    return loading
  }

  if (error) {
    return (
      <section className="grid h-full min-h-0 place-items-center p-6">
        <p
          className="rounded-xl border border-error-400 bg-error-100 px-4 py-3 text-sm font-medium text-error-600"
          role="alert"
        >
          Не удалось загрузить задачи
        </p>
      </section>
    )
  }

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 px-[clamp(20px,3vw,36px)] pt-[clamp(26px,3vw,38px)] max-[860px]:px-[clamp(20px,7vw,32px)]">
        {header}
        <div className="mb-8">
          <div className="flex items-center gap-4 max-[720px]:flex-wrap">
            <label className="flex h-12 min-w-[260px] flex-1 items-center gap-3 rounded-xl border border-border px-4 text-secondary-300 focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100">
              <MagnifyingGlassIcon className="size-5" />
              <input
                value={searchQuery}
                aria-label="Поиск задачи"
                className="w-full border-0 bg-transparent p-0 text-sm text-secondary-500 outline-none ring-0 placeholder:text-secondary-300 focus:ring-0"
                placeholder="Поиск задачи"
                type="search"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
            <Select
              aria-label="Категория задачи"
              containerClassName="min-w-48 max-[720px]:flex-1"
              size="lg"
              value=""
              onChange={handleCategoryChange}
            >
              <option value="">Все категории</option>
              <option value="Дизайн">Дизайн</option>
              <option value="Разработка">Разработка</option>
              <option value="Исследование">Исследование</option>
              <option value="UX">UX</option>
              <option value="Вёрстка">Вёрстка</option>
            </Select>
            <Select
              aria-label="Сортировка задач"
              containerClassName="min-w-48 max-[720px]:flex-1"
              size="lg"
              value={sortOrder}
              onChange={handleSortTasks}
            >
              <option value="default">Без сортировки</option>
              <option value="deadline-asc">Сначала ближайшие</option>
              <option value="deadline-desc">Сначала поздние</option>
            </Select>
          </div>
          <div
            aria-label="Выбранные категории"
            className="mt-3 flex flex-wrap gap-2 empty:hidden"
          >
            {selectedCategories.map((category) => (
              <Chip
                key={category}
                onRemove={() => handleCategoryRemove(category)}
                removeLabel={`Удалить категорию ${category}`}
              >
                {category}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-surface-muted px-[clamp(20px,3vw,36px)] py-8 max-[860px]:px-[clamp(20px,7vw,32px)]">
        {visibleTasks.length === 0 ? (
          <EmptyState
            description="Попробуйте изменить поисковый запрос или выбрать другую категорию."
            icon={<DocumentMagnifyingGlassIcon />}
            title="Задачи не найдены"
          />
        ) : (
          <>
            <section>
              <SectionHeading
                actionLabel="Показать все"
                title="Срочные задачи"
              />
              <TaskGrid tasks={urgentTasks} />
            </section>
            <section className="mt-12">
              <SectionHeading actionLabel="Показать все" title="Новые задачи" />
              <TaskGrid tasks={recentTasks} />
            </section>
          </>
        )}
      </div>
    </section>
  )
}
