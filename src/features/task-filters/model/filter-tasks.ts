import { type Task } from '@/src/entities/task'

export interface TaskFilters {
  searchQuery: string
  selectedCategories: Task['tag'][]
}

export const filterTasks = (
  tasks: Task[],
  { searchQuery, selectedCategories }: TaskFilters,
): Task[] => {
  return tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(task.tag)

    return matchesSearch && matchesCategory
  })
}
