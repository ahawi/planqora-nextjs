import { baseApi } from '@/src/shared/api'

import type { TaskDashboardStats } from '../lib/get-task-dashboard-stats'
import type { GetTasksQuery } from '../model/get-tasks-query-schema'
import type { Task } from '../model/types'

interface GetTasksResponse {
  tasks: Task[]
}

interface GetTaskDashboardStatsResponse {
  stats: TaskDashboardStats
}

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], GetTasksQuery | void>({
      query: (queryParams) => ({
        url: 'tasks',
        params: queryParams ?? {},
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
