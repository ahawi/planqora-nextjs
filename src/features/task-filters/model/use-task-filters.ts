import { useState } from 'react'

import type { Task } from '@/src/entities/task'
import { useDebounce } from '@/src/shared/lib'

import { filterTasks } from './filter-tasks'
import { sortTasks, type TaskSort } from './sort-tasks'

export const useTaskFilters = (tasks: Task[]) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<Task['tag'][]>(
    [],
  )
  const [sortOrder, setSortOrder] = useState<TaskSort>('default')

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const filteredTasks = filterTasks(tasks, {
    searchQuery: debouncedSearchQuery,
    selectedCategories,
  })

  const visibleTasks = sortTasks(filteredTasks, sortOrder)

  const addCategory = (category: Task['tag']) => {
    if (!category) return

    setSelectedCategories((categories) => {
      if (categories.includes(category)) {
        return categories
      }
      return [...categories, category]
    })
  }

  const removeCategory = (category: Task['tag']) => {
    setSelectedCategories((categories) =>
      categories.filter((currentCategory) => currentCategory !== category),
    )
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    addCategory,
    removeCategory,
    sortOrder,
    setSortOrder,
    visibleTasks,
  }
}
