import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import AnalyticModel from '../models/analytic'

const getPagination = (page: number, size: number) => {
	const limit = size !== 0 ? +size : 2
	const offset = page !== 0 ? page * limit : 0

	return { limit, offset }
}
interface GetAnalyticsQuery {
	page: number
	size: number
}

export const getAnalytics: RequestHandler<
	unknown,
	unknown,
	unknown,
	GetAnalyticsQuery
> = async (req, res, next) => {
	const { page, size } = req.query

	const { limit, offset } = getPagination(page, size)

	try {
		const analytics = await AnalyticModel.paginate({}, { offset, limit })

		res.status(200).json(analytics)
	} catch (error) {
		next(error)
	}
}

export const getAnalyticByVideoId: RequestHandler = async (req, res, next) => {
	const { videoId } = req.params

	try {
		if (!mongoose.isValidObjectId(videoId)) {
			throw createHttpError(400, 'Invalid video id')
		}

		const analytic = await AnalyticModel.findOne({ videoId })

		if (analytic == null) {
			throw createHttpError(404, 'Analytic of video not found')
		}

		res.status(200).json(analytic)
	} catch (error) {
		next(error)
	}
}

interface SaveAnalyticBody {
	videoId: string
}

export const saveAnalytic: RequestHandler<
	unknown,
	unknown,
	SaveAnalyticBody,
	unknown
> = async (req, res, next) => {
	const { videoId } = req.body

	try {
		const newAnalytic = await AnalyticModel.findOneAndUpdate(
			{ videoId },
			{ $push: { views: { time: new Date(Date.now()).toISOString() } } },
			{ upsert: true, returnDocument: 'after' }
		)
		res.status(201).json(newAnalytic)
	} catch (error) {
		next(error)
	}
}
