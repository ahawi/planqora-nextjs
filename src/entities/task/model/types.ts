export interface Task {
  assignee: string
  comments: number
  coverTone: 'primary' | 'warning'
  id: string
  priority: 'high' | 'low' | 'medium'
  progress: number
  space: string
  status: 'backlog' | 'done' | 'in-progress' | 'todo'
  tag: string
  title: string
  deadline: string
}
