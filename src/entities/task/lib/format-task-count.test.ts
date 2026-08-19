import { describe, expect, test } from 'vitest'

import { formatTaskCount } from './format-task-count'

describe('formatTaskCount', () => {
  test('0 => 0 задач', () => {
    const result = formatTaskCount(0)

    expect(result).toBe('0 задач')
  })

  test('1 => 1 задача', () => {
    const result = formatTaskCount(1)

    expect(result).toBe('1 задача')
  })

  test('2 => 2 задачи', () => {
    const result = formatTaskCount(2)

    expect(result).toBe('2 задачи')
  })

  test('5 => 5 задач', () => {
    const result = formatTaskCount(5)

    expect(result).toBe('5 задач')
  })

  test('11 => 11 задач', () => {
    const result = formatTaskCount(11)

    expect(result).toBe('11 задач')
  })

  test('21 => 21 задача', () => {
    const result = formatTaskCount(21)

    expect(result).toBe('21 задача')
  })

  test('22 => 22 задачи', () => {
    const result = formatTaskCount(22)

    expect(result).toBe('22 задачи')
  })

  test('25 => 25 задач', () => {
    const result = formatTaskCount(25)

    expect(result).toBe('25 задач')
  })
})
