import { FC } from 'react'
import { PathRouteProps } from 'react-router-dom'

export enum Pages {
  Videos = 'Videos',
  VideoPlayer = 'VideoPlayer',
  NotFound = 'NotFound',
}

export const ROUTES = {
  [Pages.Videos]: '/videos',
  [Pages.VideoPlayer]: '/video/:id',
  [Pages.NotFound]: '*',
}

interface PathRouteCustomProps {
  title?: string
  component: FC
}

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>
type ProtectedRutes = Record<Pages, PathRouteProps & PathRouteCustomProps>

export type { Routes, ProtectedRutes }
