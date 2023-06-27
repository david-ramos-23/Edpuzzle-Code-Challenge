import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import QuestionModel from '../models/question'

export const getQuestions: RequestHandler = async (req, res, next) => {
	try {
		const questions = await QuestionModel.find()

		res.status(200).json(questions)
	} catch (error) {
		next(error)
	}
}

export const getQuestion: RequestHandler = async (req, res, next) => {
	const { questionId } = req.params

	try {
		if (!mongoose.isValidObjectId(questionId)) {
			throw createHttpError(400, 'Invalid question id')
		}

		const question = await QuestionModel.findById(questionId)

		if (question == null) {
			throw createHttpError(404, 'Question not found')
		}

		res.status(200).json(question)
	} catch (error) {
		next(error)
	}
}
