import type { VideoResponse, VideosDetailsData } from '../types'
import VideoCard from './VideoCard'
import { setSelectedVideo } from '../state/videos/videosSlice'
import { useAppDispatch } from '../state/hooks'

export const VideoList = ({
  videos,
  details,
}: {
  videos: VideoResponse
  details: VideosDetailsData
}) => {
  const dispatch = useAppDispatch()

  const renderedList = videos.map((video, index) => {
    const detailsItemsIndex = details.items.findIndex(
      (item) => item.id === video.videoId
    )

    return (
      <VideoCard
        key={video.videoId}
        onVideoSelect={() =>
          dispatch(
            setSelectedVideo({
              video,
              details: details.items[detailsItemsIndex],
            })
          )
        }
        videoDetails={details.items[index]}
      />
    )
  })

  return (
    <section className='flex flex-col gap-4 overflow-y-auto lg:max-h-[700px] lg:flex-[4] lg:px-4'>
      <header className='sticky top-0 z-[1] border-b-2 border-amber-300 bg-[#ffffffaa]  py-1 text-center text-2xl font-semibold backdrop-blur-sm'>
        List of videos
      </header>
      {renderedList}
    </section>
  )
}
