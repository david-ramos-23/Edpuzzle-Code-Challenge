import { useState } from 'react'
import { View } from '../types'
import { timeAgo } from '../utils'
import { Button } from './Button'

export const Views = ({ views }: { views: View[] }) => {
  const [length, setLength] = useState<number>(2)
  const viewsCopy = [...views]
  const sortedViews =
    viewsCopy !== undefined
      ? viewsCopy.sort((a, b) => (b.time > a.time ? 1 : -1))
      : []
  const hasViewsToLoad = views.length > 2 && length !== views.length

  return (
    <div className='flex flex-col lg:max-h-[250px] lg:flex-[2] lg:overflow-y-auto'>
      <h2 className='sticky top-0 z-[1] bg-[#ffffffaa] pb-1 text-xl font-semibold backdrop-blur-sm'>
        Viewed {views.length} {views.length === 1 ? 'time' : 'times'}
      </h2>
      {sortedViews !== undefined
        ? sortedViews.slice(0, length).map((view) => (
            <p key={view._id}>
              {`Viewed ${timeAgo(view.time) as string} `}
              {`at ${new Date(view.time).toLocaleTimeString('en-GB', {
                hour12: true,
              })}`}
            </p>
          ))
        : null}
      {hasViewsToLoad ? (
        <Button
          onClick={() => {
            setLength(views.length)
          }}
          className='bottom-0 rounded-full bg-yellow-300 p-2 px-6 text-center align-middle  text-black transition-colors duration-300 ease-in-out hover:bg-yellow-400 sm:text-lg lg:absolute'
        >
          Load {views.length - length} more
        </Button>
      ) : null}
    </div>
  )
}
