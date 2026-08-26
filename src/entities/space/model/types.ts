export interface Space {
  id: string
  description: string
  icon: string
  progress: number
  tasks: number
  title: string
  tone: 'primary' | 'success' | 'warning'
}
