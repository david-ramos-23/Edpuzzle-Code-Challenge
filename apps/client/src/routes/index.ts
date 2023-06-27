import { lazy } from 'react'
import { Pages, Routes } from './types'

export const routes: Routes = {
  [Pages.Videos]: {
    component: lazy(
      async () =>
        await import('../pages/Videos').then((module) => ({
          default: module.Videos,
        }))
    ),
    path: '/videos',
    title: 'Videos Page',
  },
  [Pages.VideoPlayer]: {
    component: lazy(
      async () =>
        await import('../pages/VideoPlayer').then((module) => ({
          default: module.VideoPlayer,
        }))
    ),
    path: '/videos/:videoId',
    title: 'Video Player Page',
  },
  [Pages.NotFound]: {
    component: lazy(
      async () =>
        await import('../pages/NotFound').then((module) => ({
          default: module.NotFound,
        }))
    ),
    path: '/*',
    title: 'Not found',
  },
}

export * from './Pages'
