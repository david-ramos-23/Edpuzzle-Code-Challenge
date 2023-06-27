import mongoose from 'mongoose'
import { server } from '../index'
import { api } from './helpers'

describe('Videos Endpoints', () => {
	const videoId = '649060c54f980872e3ef6b79'
	test('should get all videos', async () => {
		await api
			.get('/api/videos')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('should get an existing video', async () => {
		await api
			.get(`/api/videos/${videoId}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	afterAll(async () => {
		await mongoose.connection.close()
		server.close()
	})
})
