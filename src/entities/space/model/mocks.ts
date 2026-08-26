import type { Space } from './types'

export const spacesMock: Space[] = [
  {
    id: 'space-web-redesign',
    icon: 'WD',
    tone: 'primary',
    title: 'Редизайн сайта',
    description: 'Дизайн и разработка',
    tasks: 12,
    progress: 68,
  },
  {
    id: 'space-mobile-app',
    icon: 'MA',
    tone: 'warning',
    title: 'Мобильное приложение',
    description: 'Продуктовая команда',
    tasks: 8,
    progress: 42,
  },
  {
    id: 'space-marketing',
    icon: 'MK',
    tone: 'success',
    title: 'Маркетинг',
    description: 'Контент и продвижение',
    tasks: 15,
    progress: 81,
  },
]
