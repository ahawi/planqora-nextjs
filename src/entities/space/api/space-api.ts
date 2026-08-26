import { baseApi } from '@/src/shared/api'

import type { Space } from '../model/types'

interface GetSpacesResponse {
  spaces: Space[]
}

const spaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpaces: builder.query<Space[], void>({
      query: () => ({
        url: 'spaces',
      }),
      transformResponse: (response: GetSpacesResponse) => response.spaces,
    }),
  }),
})

export const { useGetSpacesQuery } = spaceApi
