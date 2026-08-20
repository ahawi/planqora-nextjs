import { describe, expect, test } from 'vitest'

import { deleteTask } from './delete-task'
import { type Task } from './types'

const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Первая задача',
    deadline: '2026-08-25',
    status: 'backlog',
    priority: 'medium',
    tag: 'Тест',
    assignee: 'АН',
    space: 'Разработка',
    comments: 0,
    progress: 0,
    coverTone: 'primary',
  },
  {
    id: 'task-2',
    title: 'Вторая задача',
    deadline: '2026-08-26',
    status: 'todo',
    priority: 'high',
    tag: 'Тест',
    assignee: 'ЕК',
    space: 'Разработка',
    comments: 2,
    progress: 20,
    coverTone: 'warning',
  },
]

describe('deleteTask', () => {
  test('удаляет задачу только с нужным id', () => {
    const result = deleteTask(tasks, 'task-1')

    expect(result).toEqual([tasks[1]])
    expect(result).not.toBe(tasks)
    expect(tasks.map((task) => task.id)).toEqual(['task-1', 'task-2'])
  })

  test('не удаляет задачи если подходящего id нет в массиве', () => {
    const result = deleteTask(tasks, 'task-3')

    expect(tasks.map((task) => task.id)).toEqual(['task-1', 'task-2'])
    expect(result).toEqual(tasks)
    expect(result).not.toBe(tasks)
  })
})
