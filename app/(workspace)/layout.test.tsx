import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import WorkspaceLayout from './layout'

const { requireSessionMock } = vi.hoisted(() => ({
  requireSessionMock: vi.fn(),
}))

vi.mock('@/src/shared/lib/server/require-session', () => ({
  requireSession: requireSessionMock,
}))

vi.mock('@/src/widgets/app-sidebar', () => ({
  AppSidebar: () => <aside>Боковая панель</aside>,
}))

vi.mock('@/src/widgets/dashboard-header', () => ({
  MobileHeader: () => <header>Мобильная шапка</header>,
}))

describe('WorkspaceLayout', () => {
  beforeEach(() => {
    requireSessionMock.mockResolvedValue({})
  })

  test('проверяет сессию и показывает рабочую область', async () => {
    const layout = await WorkspaceLayout({
      children: <main>Рабочая область</main>,
    })

    render(layout)

    expect(requireSessionMock).toHaveBeenCalledOnce()
    expect(screen.getByText('Рабочая область')).toBeInTheDocument()
  })

  test('не создаёт layout если проверка сессии завершилась редиректом', async () => {
    requireSessionMock.mockRejectedValue(new Error('NEXT_REDIRECT'))

    await expect(
      WorkspaceLayout({
        children: <main>Рабочая область</main>,
      }),
    ).rejects.toThrow('NEXT_REDIRECT')
  })
})
