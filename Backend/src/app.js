import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import interviewRoutes from './routes/interviewRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/interview', interviewRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Mock Interviewer Backend running! 🚀' })
})

export default app