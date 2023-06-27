import app from './app'
import { PORT } from './config'
import { dbConnect } from './db'

export const server = await app.listen(PORT)
console.log('Server on port', PORT)
await dbConnect()
