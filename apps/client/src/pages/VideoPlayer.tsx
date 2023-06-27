import { useVideos } from '../hooks/useVideos'
import { useParams } from 'react-router-dom'
import { QuestionList, VideoDetail } from '../components'
import { Views } from '../components/Views'
import { useAnalytics } from '../hooks/useAnalytics'

interface Params {
  videoId: string
}
export function VideoPlayer() {
  const { videoId } = useParams<keyof Params>() as Params
  const { selectedVideo } = useVideos(videoId)
  const { views } = useAnalytics({
    videoId: selectedVideo?.video.id,
  })

  return (
    <section className='relative flex flex-col flex-nowrap gap-5 lg:w-[80rem] lg:flex-row'>
      {selectedVideo !== undefined ? (
        <>
          <VideoDetail video={selectedVideo?.video} enableAlert />

          <article className='flex flex-col gap-12 lg:flex-[4] lg:px-4 '>
            <QuestionList questions={selectedVideo?.video.questions} />
            <Views views={views ?? []} />
          </article>
        </>
      ) : null}
    </section>
  )
}
