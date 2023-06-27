import { Link } from 'react-router-dom'
import { Video } from '../types'
import YouTube, {
  YouTubeProps,
  YouTubePlayer,
  YouTubeEvent,
} from 'react-youtube'
import { useState } from 'react'
import { useAlert } from '../hooks/useAlert'
import { useSaveAnalyticsMutation } from '../services/analytics'

export const VideoDetail = ({
  video,
  showLink = false,
  enableAlert = false,
}: {
  video: Video
  showLink?: boolean
  enableAlert?: boolean
}) => {
  const [player, setPlayer] = useState<YouTubePlayer | undefined>(undefined)
  const { calculateProgress } = useAlert({ player })
  const videoShareLink = `${window.location.href}/${video.videoId}`
  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
  }
  const [saveAnalytics] = useSaveAnalyticsMutation()

  const conditionalProps = {
    onPause: calculateProgress,
    onPlay: async (event: YouTubeEvent<number>) => {
      await calculateProgress(event)
      await saveAnalytics({ videoId: video.id })
    },
    onEnd: calculateProgress,
  }
  return (
    <article className='flex w-full flex-col lg:flex-[6]'>
      {!showLink ? (
        <h2 className='pb-2 text-xl font-semibold'>{video.title}</h2>
      ) : null}
      <YouTube
        videoId={video.videoId}
        opts={opts}
        onReady={(e) => {
          setPlayer(e.target)
        }}
        onPlay={async () => await saveAnalytics({ videoId: video.id })}
        {...(enableAlert && conditionalProps)}
        className='w-ful relative aspect-video'
      />
      {showLink ? (
        <div className='py-4'>
          <label htmlFor='share'>Share link</label>

          <div className='flex flex-row justify-between py-2 '>
            <input
              id='share'
              type='text'
              contentEditable={false}
              value={videoShareLink}
              readOnly
              className='w-4/5 rounded-full border-[1px] border-black p-2 px-6 outline-0 sm:text-lg'
            />
            <Link
              to={`/videos/${video.videoId}`}
              className='rounded-full bg-yellow-300 p-2 px-6 text-center align-middle font-bold text-black transition-colors duration-300 ease-in-out hover:bg-yellow-400 sm:text-lg'
            >
              Go
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  )
}
