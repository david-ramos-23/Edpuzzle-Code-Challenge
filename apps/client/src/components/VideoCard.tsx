import { Item } from '../types'
import { convertISO8601ToDate } from '../utils'

const VideoCard = ({
  videoDetails,
  onVideoSelect,
}: {
  videoDetails: Item
  onVideoSelect: () => void
}) => {
  const duration = convertISO8601ToDate(videoDetails.contentDetails.duration)

  return (
    <article
      onClick={() => {
        onVideoSelect()
        window.scrollTo(0, 0)
      }}
      className='bottom-2 flex cursor-pointer flex-col items-start justify-start gap-2 border-b-2 border-amber-300 pb-4 lg:flex-row'
    >
      <div className='w-full lg:basis-3/6'>
        <span className='sticky'>
          <img
            width='100%'
            height='100%'
            src={videoDetails.snippet.thumbnails.medium.url}
            alt={videoDetails.snippet.title}
          />
          <p className='absolute bottom-1 right-1 rounded-lg bg-black p-1 text-sm text-white'>
            {duration}
          </p>
        </span>
      </div>
      <h3 className='text-md font-medium sm:text-xl md:text-2xl lg:basis-3/6 lg:text-base'>
        {videoDetails.snippet.title}
      </h3>
    </article>
  )
}

export default VideoCard
