import { baseApi } from '@/src/shared/api'

import type { TaskDashboardStats } from '../lib/get-task-dashboard-stats'
import type { Task } from '../model/types'

interface GetTasksResponse {
  tasks: Task[]
}

interface GetTaskDashboardStatsResponse {
  stats: TaskDashboardStats
}

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string | void>({
      query: (spaceId) => ({
        url: 'tasks',
        params: { spaceId },
      }),
      transformResponse: (response: GetTasksResponse) => response.tasks,
      providesTags: ['Task'],
    }),

    getTaskDashboardStats: builder.query<TaskDashboardStats, void>({
      query: () => ({
        url: 'dashboard',
      }),
      transformResponse: (response: GetTaskDashboardStatsResponse) =>
        response.stats,
      providesTags: ['Task'],
    }),
  }),
})

export const { useGetTasksQuery, useGetTaskDashboardStatsQuery } = taskApi
