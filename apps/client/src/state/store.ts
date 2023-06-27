import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit'
import { videosApi } from '../services/videos'
import videosSlice from './videos/videosSlice'
import { Selector } from 'react-redux'
import { analyticsApi } from '../services/analytics'

export const rootReducer = combineReducers({
  [videosApi.reducerPath]: videosApi.reducer,
  [analyticsApi.reducerPath]: analyticsApi.reducer,
  videos: videosSlice,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(
        videosApi.middleware,
        analyticsApi.middleware
      ),
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppSelector<T> = Selector<RootState, T>
