import express from 'express'
import {
  startInterview,
  submitAnswer,
  getReport
} from '../controllers/interviewController.js'

const router = express.Router()

// POST /api/interview/start  ← naya interview shuru karo
router.post('/start', startInterview)

// POST /api/interview/submit  ← answer submit karo
router.post('/submit', submitAnswer)

// GET /api/interview/report/:interviewId  ← final report lo
router.get('/report/:interviewId', getReport)

export default router