import type { Task } from '@/src/entities/task'
import { baseApi } from '@/src/shared/api'

import type { CreateTaskRequest } from '../model/types'

interface CreateTaskResponse {
  task: Task
}

const createTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        body,
      }),
      transformResponse: (response: CreateTaskResponse) => response.task,
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useCreateTaskMutation } = createTaskApi
