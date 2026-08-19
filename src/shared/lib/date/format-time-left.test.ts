import { describe, expect, test } from 'vitest'

import { formatTimeLeft } from './format-time-left'

const currentDate = new Date('2026-08-17T12:00:00Z')

describe('formatTimeLeft', () => {
  test('2026-08-16 => Просрочено', () => {
    const deadline = '2026-08-16'
    const result = formatTimeLeft(deadline, currentDate)
    expect(result).toBe('Просрочено')
  })

  test('2026-08-17 => Сегодня', () => {
    const deadline = '2026-08-17'
    const result = formatTimeLeft(deadline, currentDate)
    expect(result).toBe('Сегодня')
  })

  test('2026-08-18 => Остался 1 день', () => {
    const deadline = '2026-08-18'
    const result = formatTimeLeft(deadline, currentDate)
    expect(result).toBe('Остался 1 день')
  })

  test('2026-08-19 => Осталось 2 дня', () => {
    const deadline = '2026-08-19'
    const result = formatTimeLeft(deadline, currentDate)
    expect(result).toBe('Осталось 2 дня')
  })

  test('2026-08-22 => Осталось 5 дней', () => {
    const deadline = '2026-08-22'
    const result = formatTimeLeft(deadline, currentDate)
    expect(result).toBe('Осталось 5 дней')
  })

  test('2026-08-28 => Осталось 11 дней', () => {
    const deadline = '2026-08-28'
    const result = formatTimeLeft(deadline, currentDate)
    expect(result).toBe('Осталось 11 дней')
  })

  test('2026-09-07 => Остался 21 день', () => {
    const deadline = '2026-09-07'
    const result = formatTimeLeft(deadline, currentDate)
    expect(result).toBe('Остался 21 день')
  })
})
