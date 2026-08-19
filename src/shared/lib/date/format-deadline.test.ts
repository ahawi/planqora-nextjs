import { describe, expect, test } from 'vitest'

import { formatDeadline } from './format-deadline'

describe('formatDeadline', () => {
  test('форматирует дату с августом', () => {
    const deadline = '2026-08-18'

    const result = formatDeadline(deadline)

    expect(result).toBe('18 авг.')
  })

  test('форматирует дату с декабрем', () => {
    const deadline = '2026-12-31'

    const result = formatDeadline(deadline)

    expect(result).toBe('31 дек.')
  })
})
