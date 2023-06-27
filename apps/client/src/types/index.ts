export interface Question {
  questionId: { text: string; _id: string }
  time: number
  _id: string
}

export interface Video {
  id: string
  title: string
  videoId: string
  questions: Question[]
}

export interface SelectedVideoState {
  video: Video
  details: Item
}

export type VideoResponse = Video[]
export interface VideosDetailsData {
  kind: string
  etag: string
  items: Item[]
  pageInfo: PageInfo
}

export interface Item {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  contentDetails: ContentDetails
}

export interface ContentDetails {
  duration: string
  dimension: string
  definition: string
  caption: string
  licensedContent: boolean
  projection: string
}

export interface Snippet {
  publishedAt: Date
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  tags: string[]
  categoryId: string
  liveBroadcastContent: string
  defaultLanguage: string
  localized: Localized
  defaultAudioLanguage: string
}

export interface Localized {
  title: string
  description: string
}

export interface Thumbnails {
  default: Default
  medium: Default
  high: Default
  standard: Default
  maxres: Default
}

export interface Default {
  url: string
  width: number
  height: number
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface AnalyticsResponse {
  videoId: string
  createdAt: Date
  updatedAt: Date
  views: View[]
  id: string
}

export interface View {
  time: Date
  _id: string
}
