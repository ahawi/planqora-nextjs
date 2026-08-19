import type { Task } from './types'

export const priorityLabels: Record<Task['priority'], string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
}
export const statusLabels: Record<Task['status'], string> = {
  backlog: 'Бэклог',
  todo: 'К выполнению',
  'in-progress': 'В работе',
  done: 'Готово',
}
