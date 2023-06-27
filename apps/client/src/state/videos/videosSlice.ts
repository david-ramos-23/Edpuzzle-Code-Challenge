import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SelectedVideoState } from '../../types'
import { RootState } from '../store'
import { useAppSelector } from '../hooks'

export interface VideosState {
  selectedVideo: SelectedVideoState | undefined
}

const initialState: VideosState = {
  selectedVideo: undefined,
}

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setSelectedVideo: (
      state: VideosState,
      action: PayloadAction<SelectedVideoState | undefined>
    ) => {
      state.selectedVideo = action.payload
    },
  },
})

export const { setSelectedVideo } = videosSlice.actions

export const selectedVideoSelector = (state: RootState) =>
  state.videos.selectedVideo

export const useSelectedVideo = (): SelectedVideoState | undefined =>
  useAppSelector(selectedVideoSelector)

export default videosSlice.reducer
