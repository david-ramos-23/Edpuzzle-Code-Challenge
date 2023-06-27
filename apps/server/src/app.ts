import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import videosRoutes from './routes/videos'
import questionsRoutes from './routes/questions'
import analyticsRoutes from './routes/analytics'

const app: ReturnType<typeof express> = express()

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/videos', videosRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/analytics', analyticsRoutes)

async function serveClient() {
	const path = await import('path')
	app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')))

	app.get('*', (req, res) => {
		console.log(
			path.resolve(__dirname, '..', '..', 'client', 'dist', 'index.html')
		)
		res.sendFile(
			path.resolve(__dirname, '..', '..', 'client', 'dist', 'index.html')
		)
	})
	return path
}

if (process.env.NODE_ENV === 'production') {
	void serveClient()
}

export default app
