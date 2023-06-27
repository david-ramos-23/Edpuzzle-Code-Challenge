import { View } from '../types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'
import { useGetAnalyticsByIdQuery } from '../services/analytics'

export const useAnalytics = ({
  videoId,
}: {
  videoId: string | undefined
}): {
  views: View[] | undefined
  isLoading: boolean
  isError: boolean
  error: FetchBaseQueryError | SerializedError | undefined
} => {
  const {
    data: analytics,
    isLoading,
    isError,
    error,
  } = useGetAnalyticsByIdQuery(
    { videoId: videoId as string },
    { skip: videoId == null }
  )

  return {
    views: analytics?.views,
    isLoading,
    isError,
    error,
  }
}
