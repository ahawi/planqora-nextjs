import { describe, expect, test } from 'vitest'

import { getWeekDays } from './get-week-days'

describe('getWeekDays', () => {
  test('возвращает неделю с понедельника по воскресенье', () => {
    const currentDate = new Date(2026, 7, 27)

    const result = getWeekDays(currentDate)

    expect(
      result.map(({ dateKey, label, dayNumber }) => ({
        dateKey,
        label,
        dayNumber,
      })),
    ).toEqual([
      {
        dateKey: '2026-08-24',
        label: 'Пн',
        dayNumber: 24,
      },
      {
        dateKey: '2026-08-25',
        label: 'Вт',
        dayNumber: 25,
      },
      {
        dateKey: '2026-08-26',
        label: 'Ср',
        dayNumber: 26,
      },
      {
        dateKey: '2026-08-27',
        label: 'Чт',
        dayNumber: 27,
      },
      {
        dateKey: '2026-08-28',
        label: 'Пт',
        dayNumber: 28,
      },
      {
        dateKey: '2026-08-29',
        label: 'Сб',
        dayNumber: 29,
      },
      {
        dateKey: '2026-08-30',
        label: 'Вс',
        dayNumber: 30,
      },
    ])
  })

  test('относит воскресенье к текущей неделе', () => {
    const sunday = new Date(2026, 7, 30)

    const result = getWeekDays(sunday)

    expect(result[0].dateKey).toBe('2026-08-24')
    expect(result[6].dateKey).toBe('2026-08-30')
  })

  test('не изменяет переданную дату', () => {
    const currentDate = new Date(2026, 7, 27, 15, 30)
    const timestampBeforeCall = currentDate.getTime()

    getWeekDays(currentDate)

    expect(currentDate.getTime()).toBe(timestampBeforeCall)
  })
})
