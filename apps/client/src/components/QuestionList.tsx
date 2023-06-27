import { Question } from '../types'
import { convertSeconds } from '../utils'

export const QuestionList = ({ questions }: { questions: Question[] }) => {
  const hasQuestions = questions.length > 0

  return (
    <div className='flex-[2]'>
      <h2 className='pb-1 text-xl font-semibold'>Questions in the video</h2>
      {questions.map((question) => (
        <p key={question._id}>
          {convertSeconds(question.time)}
          <span className='ml-2'>{question.questionId.text}</span>
        </p>
      ))}
      {!hasQuestions ? (
        <p className='italic'>Video doesn&apos;t have any questions</p>
      ) : null}
    </div>
  )
}
