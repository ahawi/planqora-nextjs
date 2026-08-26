import { type Space } from '../model/types'

interface SpaceDTO {
  id: string
  title: string
  description: string
  tasks: {
    progress: number
  }[]
}

export const mapSpaceDTO = (space: SpaceDTO): Space => {
  const tasksCount = space.tasks.length

  const progress =
    tasksCount === 0
      ? 0
      : Math.round(
          space.tasks.reduce((total, task) => total + task.progress, 0) /
            tasksCount,
        )

  const icon = space.title
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()

  const tone: Space['tone'] =
    progress >= 75 ? 'success' : progress >= 50 ? 'primary' : 'warning'

  return {
    id: space.id,
    title: space.title,
    description: space.description,
    icon,
    tasks: tasksCount,
    progress,
    tone,
  }
}
