import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import useDebounce from './use-debounce'

afterEach(() => {
  vi.useRealTimers()
})

describe('useDebounce', () => {
  test('обновляет значение только после окончания задержки', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: {
          value: 'Старое значение',
        },
      },
    )

    expect(result.current).toBe('Старое значение')

    rerender({
      value: 'Новое значение',
    })

    expect(result.current).toBe('Старое значение')

    act(() => {
      vi.advanceTimersByTime(299)
    })

    expect(result.current).toBe('Старое значение')

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(result.current).toBe('Новое значение')
  })

  test('отменяет предыдущий таймер при новом изменении', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: {
          value: 'Начальное значение',
        },
      },
    )

    rerender({
      value: 'Первое изменение',
    })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    rerender({
      value: 'Второе изменение',
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe('Начальное значение')

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe('Второе изменение')
  })
})
