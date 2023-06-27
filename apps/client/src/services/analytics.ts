/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AnalyticsResponse } from '../types'

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['videos'],
  endpoints: (builder) => ({
    getAnalyticsById: builder.query<AnalyticsResponse, { videoId: string }>({
      query: (body) => `/analytics/${body.videoId}`,
    }),
    saveAnalytics: builder.mutation<void, { videoId: string }>({
      query: (body) => {
        return {
          url: '/analytics',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useGetAnalyticsByIdQuery, useSaveAnalyticsMutation } =
  analyticsApi
