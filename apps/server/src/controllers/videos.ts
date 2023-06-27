import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import VideoModel from '../models/video'
import { google } from 'googleapis'
import env from '../utils/validateEnv'

export const getVideos: RequestHandler = async (req, res, next) => {
	try {
		// await QuestionModel.find()
		const videos = await VideoModel.find().populate('questions.questionId')

		res.status(200).json(videos)
	} catch (error) {
		next(error)
	}
}

export const getVideo: RequestHandler = async (req, res, next) => {
	const { videoId } = req.params

	try {
		if (!mongoose.isValidObjectId(videoId)) {
			throw createHttpError(400, 'Invalid video id')
		}

		const video = await VideoModel.findById(videoId).populate(
			'questions.questionId'
		)

		if (video == null) {
			throw createHttpError(404, 'Video not found')
		}

		res.status(200).json(video)
	} catch (error) {
		next(error)
	}
}

const youtube = google.youtube({
	version: 'v3',
	auth: env.YOUTUBE_API_KEY,
})

interface GetVideosDetailsBody {
	videosIds: string[]
}

export const getVideosDetails: RequestHandler<
	unknown,
	unknown,
	GetVideosDetailsBody,
	unknown
> = async (req, res, next) => {
	const { videosIds } = req.body

	try {
		const videosData = await youtube.videos.list({
			part: ['snippet', 'contentDetails'],
			id: videosIds,
		})

		res.status(200).json(videosData.data)
	} catch (error) {
		next(error)
	}
}
