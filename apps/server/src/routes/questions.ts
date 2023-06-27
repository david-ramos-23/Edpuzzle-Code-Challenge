import { Router } from 'express'
import { getQuestion, getQuestions } from '../controllers/questions'

const router: Router = Router()

router.get('/', getQuestions)

router.get('/:questionId', getQuestion)

export default router
