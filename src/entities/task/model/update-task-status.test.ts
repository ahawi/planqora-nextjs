import { describe, expect, test } from 'vitest'

import type { Task } from './types'
import { updateTaskStatus } from './update-task-status'

const createTask = (id: string, status: Task['status']): Task => ({
  id,
  status,
  title: `Задача ${id}`,
  assignee: 'ЕК',
  comments: 0,
  coverTone: 'primary',
  deadline: '2026-08-22',
  priority: 'medium',
  progress: 0,
  space: 'Тестовое пространство',
  tag: 'Разработка',
})

describe('updateTaskStatus', () => {
  test('изменяет статус задачи с указанным id', () => {
    const tasks = [
      createTask('task-1', 'todo'),
      createTask('task-2', 'backlog'),
    ]

    const result = updateTaskStatus(tasks, 'task-1', 'done')

    const updatedTask = result.find((task) => task.id === 'task-1')

    expect(updatedTask?.status).toBe('done')
  })

  test('не меняет статус другой задачи', () => {
    const tasks = [
      createTask('task-1', 'todo'),
      createTask('task-2', 'backlog'),
    ]

    const result = updateTaskStatus(tasks, 'task-1', 'done')

    const nonUpdatedTask = result.find((task) => task.id === 'task-2')

    expect(nonUpdatedTask?.status).toBe('backlog')
  })

  test('при неизвестном id возвращает данные без изменений', () => {
    const tasks = [
      createTask('task-1', 'todo'),
      createTask('task-2', 'backlog'),
    ]

    const result = updateTaskStatus(tasks, 'task-3', 'done')

    expect(result).toEqual(tasks)
  })

  test('не мутирует исходный массив и исходный объект задачи', () => {
    const tasks = [
      createTask('task-1', 'todo'),
      createTask('task-2', 'backlog'),
    ]

    const originalTask = tasks[0]

    const result = updateTaskStatus(tasks, 'task-1', 'done')

    const updatedTask = result.find((task) => task.id === 'task-1')

    expect(tasks[0].status).toBe('todo')
    expect(result).not.toBe(tasks)
    expect(updatedTask).not.toBe(originalTask)
    expect(updatedTask?.status).toBe('done')
  })
})
