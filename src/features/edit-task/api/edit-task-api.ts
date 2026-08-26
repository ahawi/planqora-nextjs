import type { Task } from '@/src/entities/task'
import { baseApi } from '@/src/shared/api'

import type { EditTaskRequest } from '../model/types'

interface EditTaskMutationArgs {
  taskId: Task['id']
  body: EditTaskRequest
}

interface EditTaskResponse {
  task: Task
}

const editTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editTask: builder.mutation<Task, EditTaskMutationArgs>({
      query: ({ taskId, body }) => ({
        url: `tasks/${taskId}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: EditTaskResponse) => response.task,
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useEditTaskMutation } = editTaskApi
