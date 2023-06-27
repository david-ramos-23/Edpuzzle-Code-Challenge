import { type ReactElement } from 'react'
import { LoadingOrError } from '../components/LoadingOrError'
import { useVideos } from '../hooks/useVideos'
import { VideoDetail, VideoList } from '../components'

export function Videos(): ReactElement {
  const {
    videos,
    isLoading,
    isError,
    error,
    videosDetailsData,
    selectedVideo,
  } = useVideos()

  if (
    isLoading ||
    Boolean(isError) ||
    videos === null ||
    videos === undefined ||
    videosDetailsData?.items == null
  ) {
    return <LoadingOrError error={error as Error} />
  }

  return (
    <section className='relative flex w-full flex-col flex-nowrap gap-5 lg:flex-row'>
      {selectedVideo !== undefined ? (
        <VideoDetail video={selectedVideo.video} showLink />
      ) : null}
      <VideoList videos={videos} details={videosDetailsData} />
    </section>
  )
}
