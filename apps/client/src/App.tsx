import type { ReactElement } from 'react'
import { Suspense, useEffect } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import {
  useGetVideosDataFromYoutubeMutation,
  useGetVideosQuery,
} from './services/videos'
import { Pages } from './routes'
import { LoadingOrError } from './components'

export function App(): ReactElement {
  const { data } = useGetVideosQuery()
  const [getVideosDataFromYoutube] = useGetVideosDataFromYoutubeMutation()

  useEffect(() => {
    if (data === null || data === undefined) {
      return
    }
    const ids = data.map((item) => item.videoId)
    getVideosDataFromYoutube({ videosIds: ids }).catch((err) => {
      console.error(err)
    })
  }, [data, getVideosDataFromYoutube])

  return (
    <div className='flex h-screen flex-col'>
      <BrowserRouter>
        <header className='mb-10 h-20 p-5'>
          <h1 className='sm:text3xl text-center text-4xl font-extrabold leading-[1.15] text-black'>
            <Link to='/videos'>
              <img
                className='m-auto'
                src='/assets/logo.svg'
                width={200}
                height={200}
                alt='Via'
              />
            </Link>
            <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>
              Code Challenge
            </span>
          </h1>
        </header>
        <main className='relative mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center p-5'>
          <Suspense fallback={<LoadingOrError />}>
            <Pages />
          </Suspense>
        </main>
      </BrowserRouter>
    </div>
  )
}
