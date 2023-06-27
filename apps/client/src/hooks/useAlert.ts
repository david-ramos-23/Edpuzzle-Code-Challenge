import { useCallback, useEffect, useRef, useState } from 'react'
import { YouTubePlayer } from 'react-youtube'
import { useVideos } from './useVideos'

interface YouTubeEvent<T> {
  target: YouTubePlayer
  data: T
}

export const useAlert = ({ player }: { player: YouTubePlayer | undefined }) => {
  const intervalCallback = useRef<NodeJS.Timer | undefined>(undefined)
  const { selectedVideo } = useVideos()
  const [questionsTime, setQuestionsTime] = useState<number[]>([])

  useEffect(() => {
    if (selectedVideo?.video.questions === undefined) return

    const time = selectedVideo?.video.questions.map((question) => question.time)
    setQuestionsTime(time)
  }, [selectedVideo?.video.questions])

  const updateCurrentTime = useCallback(
    (currentTime: number) => {
      if (questionsTime.includes(Math.floor(currentTime))) {
        const questionFound = selectedVideo?.video.questions.find(
          (question) => question.time === Math.floor(currentTime)
        )
        if (
          questionFound?.questionId.text !== undefined &&
          window.alert !== undefined
        ) {
          window.alert(`${questionFound?.questionId.text}`)
        }
      }
    },
    [questionsTime, selectedVideo?.video.questions]
  )

  const calculateProgress = useCallback(
    async (event: YouTubeEvent<number>) => {
      if (player == null) return

      if (event.data === 2 || event.data === 0) {
        clearInterval(intervalCallback.current)
      }

      if (event.data === 1 && player?.getCurrentTime != null) {
        intervalCallback.current = setInterval(
          async () => updateCurrentTime(await player.getCurrentTime()),
          100
        )
      }
    },
    [player, updateCurrentTime]
  )

  return { calculateProgress }
}
