import Interview from '../models/Interview.js'
import { generateQuestion, evaluateAnswer, generateReport } from '../utils/groq.js'

export const startInterview = async (req, res) => {
  try {
    const { role, company, difficulty } = req.body

    if (!role) {
      return res.status(400).json({ error: 'Role is required!' })
    }

    // ✅ Pichle saare interviews ke questions nikalo — same role + difficulty
    const previousInterviews = await Interview.find({
      role,
      difficulty: difficulty || 'Medium'
    }).select('questions')

    const allPreviousQuestions = previousInterviews.flatMap(
      interview => interview.questions.map(q => q.question)
    )

    console.log(`📚 Previously asked questions: ${allPreviousQuestions.length}`)

    const firstQuestion = await generateQuestion(
      role,
      difficulty || 'Medium',
      company || 'General',
      allPreviousQuestions
    )

    const interview = await Interview.create({
      role,
      company: company || 'General',
      difficulty: difficulty || 'Medium',
      questions: [],
    })

    res.status(201).json({
      interviewId: interview._id,
      question: firstQuestion,
      questionNumber: 1,
      totalQuestions: 10,
    })

  } catch (error) {
    console.error('startInterview error:', error.message)
    res.status(500).json({ error: error.message })
  }
}

export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, question, answer } = req.body

    if (!interviewId || !question || !answer) {
      return res.status(400).json({ error: 'interviewId, question and answer required!' })
    }

    const interview = await Interview.findById(interviewId)
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found!' })
    }

    const evaluation = await evaluateAnswer(
      question,
      answer,
      interview.role,
      interview.difficulty
    )

    interview.questions.push({
      question,
      userAnswer: answer,
      aiFeedback: evaluation.feedback,
      score: evaluation.score,
    })

    await interview.save()

    const questionNumber = interview.questions.length

    if (questionNumber >= 10) {
      return res.status(200).json({
        evaluation,
        questionNumber,
        totalQuestions: 10,
        interviewComplete: true,
      })
    }

    // ✅ Pichle saare interviews + current interview ke questions
    const previousInterviews = await Interview.find({
      role: interview.role,
      difficulty: interview.difficulty,
      _id: { $ne: interviewId }
    }).select('questions')

    const allPreviousQuestions = [
      ...previousInterviews.flatMap(i => i.questions.map(q => q.question)),
      ...interview.questions.map(q => q.question)
    ]

    const nextQuestion = await generateQuestion(
      interview.role,
      interview.difficulty,
      interview.company,
      allPreviousQuestions
    )

    res.status(200).json({
      evaluation,
      nextQuestion,
      questionNumber: questionNumber + 1,
      totalQuestions: 10,
      interviewComplete: false,
    })

  } catch (error) {
    console.error('submitAnswer error:', error.message)
    res.status(500).json({ error: error.message })
  }
}

export const getReport = async (req, res) => {
  try {
    const { interviewId } = req.params

    const interview = await Interview.findById(interviewId)
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found!' })
    }

    const report = await generateReport(interview.role, interview.questions)

    interview.overallScore = report.overallScore
    interview.completed = true
    await interview.save()

    res.status(200).json({
      role: interview.role,
      company: interview.company,
      difficulty: interview.difficulty,
      totalQuestions: interview.questions.length,
      questions: interview.questions,
      report,
    })

  } catch (error) {
    console.error('getReport error:', error.message)
    res.status(500).json({ error: error.message })
  }
}