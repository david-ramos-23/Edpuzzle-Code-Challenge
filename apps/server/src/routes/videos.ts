import { Router } from 'express'
import { getVideo, getVideosDetails, getVideos } from '../controllers/videos'

const router: Router = Router()

router.get('/', getVideos)

router.get('/:videoId', getVideo)

router.post('/details', getVideosDetails)

export default router
