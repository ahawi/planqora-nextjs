'use client'

import { useGetTaskDashboardStatsQuery } from '@/src/entities/task'
import { Card } from '@/src/shared/ui'

import { ActivityCard } from './activity-card'
import { DashboardOverviewSkeleton } from './dashboard-overview-skeleton'
import { RunningTasksCard } from './running-tasks-card'

export const DashboardOverview = () => {
  const {
    error,
    isLoading,
    data: dashboardStats,
  } = useGetTaskDashboardStatsQuery()

  if (isLoading) {
    return <DashboardOverviewSkeleton />
  }

  if (error) {
    return (
      <section className="mb-10 [@media(max-height:950px)]:mb-5 max-[860px]:mb-[34px]">
        <Card className="grid min-h-[238px] place-items-center border-0 bg-surface-muted p-6 [@media(max-height:950px)]:min-h-[190px] max-[860px]:min-h-[124px]">
          <p
            className="rounded-xl border border-error-400 bg-error-100 px-4 py-3 text-sm font-medium text-error-600"
            role="alert"
          >
            Не удалось загрузить статистику
          </p>
        </Card>
      </section>
    )
  }

  if (!dashboardStats) return null

  return (
    <section className="mb-10 grid grid-cols-[220px_minmax(0,1fr)] gap-6 [@media(max-height:950px)]:mb-5 max-[860px]:mb-[34px] max-[860px]:grid-cols-1 max-[860px]:gap-[30px]">
      <RunningTasksCard
        activePercent={dashboardStats.activePercent}
        activeTasks={dashboardStats.activeTasks}
        totalTasks={dashboardStats.totalTasks}
      />

      <ActivityCard activity={dashboardStats.activity} />
    </section>
  )
}
