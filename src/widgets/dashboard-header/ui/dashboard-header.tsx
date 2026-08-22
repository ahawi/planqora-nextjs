import { UserActions } from './user-actions'

interface DashboardHeaderProps {
  subtitle?: string
  title?: string
  userName: string
}

export const DashboardHeader = ({
  subtitle = 'Давайте завершим важные задачи сегодня',
  title,
  userName,
}: DashboardHeaderProps) => {
  return (
    <header className="mb-[42px] flex items-center justify-between gap-6 [@media(max-height:950px)]:mb-5 max-[860px]:mb-[30px]">
      <div>
        <h1 className="mb-1.5 text-[clamp(23px,2vw,27px)] font-bold tracking-[-0.04em] max-[860px]:text-[clamp(22px,6vw,27px)]">
          {title ? title : `Привет, ${userName}!`}
        </h1>
        <p className="text-sm text-secondary-400 max-[860px]:text-[clamp(13px,3.7vw,15px)]">
          {subtitle}
        </p>
      </div>
      <div className="max-[860px]:hidden">
        <UserActions userName={userName} />
      </div>
    </header>
  )
}
