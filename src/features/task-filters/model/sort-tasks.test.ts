import { describe, expect, test } from 'vitest'

import type { Task } from '@/src/entities/task'

import { sortTasks } from './sort-tasks'

const createTask = (id: string, deadline: string): Task => ({
  id,
  deadline,
  title: id,
  assignee: 'ЕК',
  comments: 0,
  coverTone: 'primary',
  priority: 'medium',
  progress: 0,
  space: '',
  status: 'todo',
  tag: 'Разработка',
})

const tasks = [
  createTask('middle', '2026-08-18'),
  createTask('early', '2026-08-10'),
  createTask('late', '2026-08-22'),
]

describe('sortTasks', () => {
  test('сохраняет исходный порядок при сортировке default', () => {
    const initialOrder = tasks.map((task) => task.id)

    const result = sortTasks(tasks, 'default')

    const resultOrder = result.map((task) => task.id)

    expect(resultOrder).toEqual(initialOrder)
  })

  test('deadline-asc ставит ближайшую дату первой', () => {
    const result = sortTasks(tasks, 'deadline-asc')

    expect(result.map((task) => task.id)).toEqual(['early', 'middle', 'late'])
  })

  test('deadline-desc ставит позднюю дату первой', () => {
    const result = sortTasks(tasks, 'deadline-desc')

    expect(result.map((task) => task.id)).toEqual(['late', 'middle', 'early'])
  })

  test('не изменяет исходный массив', () => {
    const initialOrder = tasks.map((task) => task.id)

    sortTasks(tasks, 'deadline-asc')

    expect(tasks.map((task) => task.id)).toEqual(initialOrder)
  })
})
