import { useEffect, useMemo } from 'react'
import {
  useGetVideosDataFromYoutubeMutation,
  useGetVideosQuery,
} from '../services/videos'
import {
  SelectedVideoState,
  Video,
  VideoResponse,
  VideosDetailsData,
} from '../types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import {
  selectedVideoSelector,
  setSelectedVideo,
} from '../state/videos/videosSlice'

export const useVideos = (
  videoId: string | undefined = undefined
): {
  videos: VideoResponse | undefined
  videosDetailsData: VideosDetailsData | undefined
  selectedVideo: SelectedVideoState | undefined
  isLoading: boolean
  isError: boolean
  error: FetchBaseQueryError | SerializedError | undefined
} => {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery()
  const [getVideosDataFromYoutube, { data: videosDetailsData }] =
    useGetVideosDataFromYoutubeMutation({ fixedCacheKey: 'shared-videos-data' })
  const dispatch = useAppDispatch()

  const selectedVideo = useAppSelector(selectedVideoSelector)

  useEffect(() => {
    if (videos === undefined || videosDetailsData !== undefined) {
      return
    }
    const ids = videos.map((item) => item.videoId)
    getVideosDataFromYoutube({ videosIds: ids }).catch((error) => {
      console.error(error)
    })
  }, [videos, getVideosDataFromYoutube, videosDetailsData])

  const selectedVideoMemo = useMemo(() => selectedVideo, [selectedVideo])

  useEffect(() => {
    if (videoId === undefined) return

    if (
      selectedVideo === undefined &&
      videos !== undefined &&
      videosDetailsData?.items !== undefined
    ) {
      const videoFound = videos?.find((video) => video.videoId === videoId)

      const indexVideoFound = videos?.indexOf(videoFound as Video)
      dispatch(
        setSelectedVideo({
          video: videoFound as Video,
          details: videosDetailsData?.items[indexVideoFound],
        })
      )
    }
  }, [dispatch, selectedVideo, videoId, videos, videosDetailsData?.items])

  return {
    videos,
    isLoading,
    isError,
    error,
    videosDetailsData,
    selectedVideo: selectedVideoMemo,
  }
}
