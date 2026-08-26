import { describe, expect, test } from 'vitest'

import { mapSpaceDTO } from './map-space'

describe('mapSpaceDTO', () => {
  test('преобразует пространство и рассчитывает прогресс задач', () => {
    const result = mapSpaceDTO({
      id: 'space-1',
      title: 'Редизайн сайта',
      description: 'Дизайн и разработка',
      tasks: [{ progress: 50 }, { progress: 100 }],
    })

    expect(result).toEqual({
      id: 'space-1',
      title: 'Редизайн сайта',
      description: 'Дизайн и разработка',
      icon: 'РС',
      tasks: 2,
      progress: 75,
      tone: 'success',
    })
  })

  test('возвращает нулевой прогресс для пространства без задач', () => {
    const result = mapSpaceDTO({
      id: 'space-empty',
      title: 'Новое пространство',
      description: 'Задач пока нет',
      tasks: [],
    })

    expect(result).toEqual({
      id: 'space-empty',
      title: 'Новое пространство',
      description: 'Задач пока нет',
      icon: 'НП',
      tasks: 0,
      progress: 0,
      tone: 'warning',
    })
  })

  test.each([
    [49, 'warning'],
    [50, 'primary'],
    [74, 'primary'],
    [75, 'success'],
  ] as const)(
    'для прогресса %i возвращает тон %s',
    (progress, expectedTone) => {
      const result = mapSpaceDTO({
        id: 'space-tone',
        title: 'Тест',
        description: '',
        tasks: [{ progress }],
      })

      expect(result.tone).toBe(expectedTone)
    },
  )
})
