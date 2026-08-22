import type { Task } from '../model/types'

const coverClasses: Record<Task['coverTone'], string> = {
  primary: 'from-primary-900 via-primary-500 to-warning-300',
  warning: 'from-secondary-500 via-error-400 to-warning-300',
}

export const TaskCover = ({ tone }: { tone: Task['coverTone'] }) => {
  return (
    <div
      className={`relative h-[clamp(125px,38vw,170px)] overflow-hidden rounded-[14px] bg-gradient-to-br ${coverClasses[tone]} min-[861px]:h-[116px] [@media(max-height:950px)]:h-20`}
    >
      <span className="absolute left-[22%] top-6 h-[72px] w-[110px] -rotate-[8deg] rounded-[10px] border-[7px] border-primary-0/70 bg-primary-0/15" />
      <span className="absolute right-[13%] top-3 h-[92px] w-[52px] rotate-[8deg] rounded-[10px] border-[7px] border-primary-0/70 bg-primary-0/15" />
    </div>
  )
}
