import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { ProfileMenu } from './profile-menu'

vi.mock('@/src/features/sign-out', () => ({
  SignOutButton: () => <button type="button">Выйти</button>,
}))

const setup = () => {
  const user = userEvent.setup()

  render(<ProfileMenu userName="Иван" />)

  return {
    profileButton: screen.getByRole('button', { name: 'Профиль Иван' }),
    user,
  }
}

describe('ProfileMenu', () => {
  test('скрывает меню по умолчанию', () => {
    const { profileButton } = setup()

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(profileButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('открывает меню по клику на профиль', async () => {
    const { profileButton, user } = setup()

    await user.click(profileButton)

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Иван')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Выйти' })).toBeInTheDocument()
    expect(profileButton).toHaveAttribute('aria-expanded', 'true')
  })

  test('закрывает открытое меню повторным кликом', async () => {
    const { profileButton, user } = setup()

    await user.click(profileButton)
    await user.click(profileButton)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(profileButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('закрывает открытое меню по Escape', async () => {
    const { profileButton, user } = setup()

    await user.click(profileButton)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(profileButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('закрывает открытое меню при внешнем клике', async () => {
    const { profileButton, user } = setup()

    await user.click(profileButton)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(document.body)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(profileButton).toHaveAttribute('aria-expanded', 'false')
  })
})
