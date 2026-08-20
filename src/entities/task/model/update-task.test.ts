import { describe, expect, test } from 'vitest'

import { type Task } from './types'
import { updateTask } from './update-task'

const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Первая задача',
    deadline: '2026-08-25',
    status: 'backlog',
    priority: 'medium',
    tag: 'Разработка',
    assignee: 'АН',
    space: 'Planqora',
    comments: 0,
    progress: 0,
    coverTone: 'primary',
  },
  {
    id: 'task-2',
    title: 'Вторая задача',
    deadline: '2026-08-30',
    status: 'in-progress',
    priority: 'high',
    tag: 'Дизайн',
    assignee: 'ЕК',
    space: 'Planqora',
    comments: 2,
    progress: 40,
    coverTone: 'warning',
  },
]

describe('updateTask', () => {
  test('обновляет поля задачи с нужным id', () => {
    const result = updateTask(tasks, 'task-1', {
      title: 'Новая первая задача',
      priority: 'high',
    })

    expect(result[0].title).toBe('Новая первая задача')
    expect(result[0].priority).toBe('high')
    expect(result[0]).toEqual({
      ...tasks[0],
      title: 'Новая первая задача',
      priority: 'high',
    })
    expect(result[1]).toBe(tasks[1])
    expect(tasks[0].title).toBe('Первая задача')
    expect(tasks[0].priority).toBe('medium')
    expect(result).not.toBe(tasks)
  })

  test('оставляет все как есть при несуществующем id', () => {
    const result = updateTask(tasks, 'task-3', {
      title: 'Новая первая задача',
      priority: 'high',
    })

    expect(result[0]).toBe(tasks[0])
    expect(result[1]).toBe(tasks[1])
    expect(result).not.toBe(tasks)
    expect(result).toEqual(tasks)
  })
})
