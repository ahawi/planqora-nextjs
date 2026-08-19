import { Task } from '@/src/entities/task'

export const columns: Array<{ id: Task['status']; title: string }> = [
  { id: 'backlog', title: 'Бэклог' },
  { id: 'todo', title: 'К выполнению' },
  { id: 'in-progress', title: 'В работе' },
  { id: 'done', title: 'Готово' },
]
