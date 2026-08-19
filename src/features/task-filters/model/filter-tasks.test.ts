import { describe, expect, test } from 'vitest'

import type { Task } from '@/src/entities/task'

import { filterTasks } from './filter-tasks'

const createTask = (id: string, title: string, tag: string): Task => ({
  id,
  title,
  tag,
  assignee: 'ЕК',
  comments: 0,
  coverTone: 'primary',
  deadline: '2026-08-18',
  priority: 'medium',
  progress: 0,
  space: '',
  status: 'todo',
})

const tasks = [
  createTask('ui-kit', 'Собрать UI-kit проекта', 'Дизайн'),
  createTask('mobile-flow', 'Продумать сценарии приложения', 'UX'),
  createTask('adaptive', 'Сверстать адаптив главной', 'Вёрстка'),
  createTask('auth', 'Настроить авторизацию', 'Разработка'),
]

describe('filterTasks', () => {
  test('возвращает все задачи, если фильтры пустые', () => {
    const result = filterTasks(tasks, {
      searchQuery: '',
      selectedCategories: [],
    })

    expect(result).toEqual(tasks)
  })

  test('поиск не зависит от регистра', () => {
    const result = filterTasks(tasks, {
      searchQuery: 'uI-KIT',
      selectedCategories: [],
    })

    expect(result.map((task) => task.id)).toEqual(['ui-kit'])
  })

  test('поиск игнорирует пробелы по краям', () => {
    const result = filterTasks(tasks, {
      searchQuery: '   ui-kit  ',
      selectedCategories: [],
    })

    expect(result.map((task) => task.id)).toEqual(['ui-kit'])
  })

  test('одна категория фильтрует задачи', () => {
    const result = filterTasks(tasks, {
      searchQuery: '',
      selectedCategories: ['UX'],
    })

    expect(result.map((task) => task.id)).toEqual(['mobile-flow'])
  })

  test('несколько категорий работают через "ИЛИ"', () => {
    const result = filterTasks(tasks, {
      searchQuery: '',
      selectedCategories: ['UX', 'Вёрстка'],
    })

    expect(result.map((task) => task.id)).toEqual(['mobile-flow', 'adaptive'])
  })

  test('поиск и категории применяются одновременно', () => {
    const result = filterTasks(tasks, {
      searchQuery: 'про',
      selectedCategories: ['Дизайн'],
    })

    expect(result.map((task) => task.id)).toEqual(['ui-kit'])
  })

  test('возвращает пустой массив, если совпадений нет', () => {
    const result = filterTasks(tasks, {
      searchQuery: 'несуществующая задача',
      selectedCategories: [],
    })

    expect(result).toEqual([])
  })
})
