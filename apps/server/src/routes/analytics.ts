import { Router } from 'express'
import {
	getAnalyticByVideoId,
	getAnalytics,
	saveAnalytic,
} from '../controllers/analytics'

const router: Router = Router()

router.get('/', getAnalytics)

router.get('/:videoId', getAnalyticByVideoId)

router.post('/', saveAnalytic)

export default router
