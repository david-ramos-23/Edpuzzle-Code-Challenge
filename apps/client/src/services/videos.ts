/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { VideoResponse, VideosDetailsData } from '../types'

export const videosApi = createApi({
  reducerPath: 'videosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['videos'],
  endpoints: (builder) => ({
    getVideos: builder.query<VideoResponse, void>({
      query: () => `/videos`,
    }),
    getVideosDataFromYoutube: builder.mutation<
      VideosDetailsData,
      { videosIds: string[] }
    >({
      query: (body) => {
        return {
          url: '/videos/details',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useGetVideosQuery, useGetVideosDataFromYoutubeMutation } =
  videosApi
