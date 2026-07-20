import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  userAnswer: { type: String, required: true },
  aiFeedback: { type: String, required: true },
  score: { type: Number, required: true }
})

const interviewSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, default: 'General' },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  questions: [questionSchema],
  overallScore: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
}, { timestamps: true })

const Interview = mongoose.model('Interview', interviewSchema)

export default Interview