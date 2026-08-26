import type { Task } from '@/src/entities/task'
import { baseApi } from '@/src/shared/api'

const deleteTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation<void, Task['id']>({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useDeleteTaskMutation } = deleteTaskApi
