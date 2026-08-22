import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { SettingsPanel } from './settings-panel'

const setup = () => {
  const user = userEvent.setup()

  render(<SettingsPanel />)

  return { user }
}

describe('SettingsPanel', () => {
  test('по умолчанию показывает основные настройки', () => {
    setup()

    expect(screen.getByRole('combobox', { name: 'Язык' })).toHaveValue(
      'Русский',
    )
    expect(screen.getByRole('radio', { name: '24 часа' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '12 часа' })).not.toBeChecked()
  })

  test('переключает формат времени', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('radio', { name: '12 часа' }))

    expect(screen.getByRole('radio', { name: '12 часа' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '24 часа' })).not.toBeChecked()
  })

  test('открывает уведомления и переключает настройку', async () => {
    const { user } = setup()

    await user.click(screen.getByText('Уведомления', { selector: 'button' }))

    const messagesSwitch = screen.getByRole('switch', { name: 'Сообщения' })
    expect(messagesSwitch).toBeChecked()

    await user.click(messagesSwitch)

    expect(messagesSwitch).not.toBeChecked()
    expect(
      screen.queryByRole('combobox', { name: 'Язык' }),
    ).not.toBeInTheDocument()
  })
})
