import { baseApi } from '@/src/shared/api'

import type { Task } from '../model/types'

interface GetTasksResponse {
  tasks: Task[]
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
  }),
})

export const { useGetTasksQuery } = taskApi
