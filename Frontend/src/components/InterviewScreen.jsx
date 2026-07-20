import { useState } from 'react'
import FeedbackCard from './FeedbackCard'

function InterviewScreen({ interviewData, setInterviewData, onComplete, onExit }) {
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [error, setError] = useState('')
  const [showExitModal, setShowExitModal] = useState(false)

  const { interviewId, role, company, difficulty, currentQuestion, questionNumber, totalQuestions } = interviewData

  const progress = ((questionNumber - 1) / totalQuestions) * 100

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError('Answer likhna toh padega bhai! 😄')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/interview/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewId,
          question: currentQuestion,
          answer: answer.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong!')
        setLoading(false)
        return
      }

      setFeedback(data.evaluation)
      setShowFeedback(true)
      setLoading(false)

      if (data.interviewComplete) {
        setTimeout(async () => {
          await fetchReport()
        }, 2000)
        return
      }

      setInterviewData(prev => ({
        ...prev,
        currentQuestion: data.nextQuestion,
        questionNumber: data.questionNumber,
      }))

    } catch (err) {
      setError('Backend se connect nahi ho pa raha!')
      setLoading(false)
    }
  }

  const fetchReport = async () => {
    try {
      const res = await fetch(`/api/interview/report/${interviewId}`)
      const data = await res.json()
      onComplete(data)
    } catch (err) {
      setError('Report load nahi ho pa rahi!')
    }
  }

  const handleNext = () => {
    setAnswer('')
    setFeedback(null)
    setShowFeedback(false)
  }

  return (
    <div className="animate-[fadeUp_0.5s_ease_both]">

      {/* ✅ Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-8 max-w-sm w-full text-center"
            style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-extrabold mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Exit Interview?
            </h3>
            <p className="text-sm text-[#7a7a9a] mb-6 leading-relaxed">
              Agar ab exit kiya toh yeh interview ka progress lost ho jayega. Pakka exit karna hai?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: '#1c1c27',
                  border: '1px solid #2a2a3d',
                  color: '#7a7a9a'
                }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowExitModal(false)
                  onExit()
                }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: 'rgba(255,101,132,0.15)',
                  border: '1px solid rgba(255,101,132,0.3)',
                  color: '#ff6584'
                }}>
                Exit Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(108,99,255,0.12)',
                border: '1px solid rgba(108,99,255,0.3)',
                color: '#6c63ff'
              }}>
              {role}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(67,232,158,0.1)',
                border: '1px solid rgba(67,232,158,0.2)',
                color: '#43e89e'
              }}>
              {company}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: difficulty === 'Easy'
                  ? 'rgba(67,232,158,0.1)'
                  : difficulty === 'Medium'
                    ? 'rgba(255,193,7,0.1)'
                    : 'rgba(255,101,132,0.1)',
                border: `1px solid ${difficulty === 'Easy'
                  ? 'rgba(67,232,158,0.2)'
                  : difficulty === 'Medium'
                    ? 'rgba(255,193,7,0.2)'
                    : 'rgba(255,101,132,0.2)'}`,
                color: difficulty === 'Easy'
                  ? '#43e89e'
                  : difficulty === 'Medium'
                    ? '#ffc107'
                    : '#ff6584'
              }}>
              {difficulty}
            </span>
          </div>

          {/* Right side — Counter + Exit */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              {questionNumber - 1}/{totalQuestions}
            </span>

            {/* ✅ Exit Button */}
            <button
              onClick={() => setShowExitModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 hover:border-[#ff6584] hover:text-[#ff6584]"
              style={{
                background: '#1c1c27',
                border: '1px solid #2a2a3d',
                color: '#7a7a9a'
              }}>
              Exit ✕
            </button>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="rounded-full h-1.5 overflow-hidden"
          style={{ background: '#1c1c27' }}>
          <div className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6c63ff, #ff6584)'
            }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl p-6 mb-4"
        style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: 'rgba(108,99,255,0.12)',
              border: '1px solid rgba(108,99,255,0.2)',
              color: '#6c63ff',
              fontFamily: "'Syne', sans-serif"
            }}>
            Q{questionNumber}
          </div>
          <span className="text-xs text-[#7a7a9a]">Interview Question</span>
        </div>
        <p className="text-base leading-relaxed text-[#f0f0ff]">
          {currentQuestion}
        </p>
      </div>

      {/* Feedback Card */}
      {showFeedback && feedback && (
        <FeedbackCard feedback={feedback} />
      )}

      {/* Answer Area */}
      {!showFeedback && (
        <div className="rounded-2xl p-6 mb-4"
          style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
          <label className="text-sm font-medium text-[#7a7a9a] mb-3 block">
            Your Answer
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Apna answer yahan likho..."
            rows={6}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
            style={{
              background: '#1c1c27',
              border: '1px solid #2a2a3d',
              color: '#f0f0ff',
            }}
            onFocus={(e) => e.target.style.borderColor = '#6c63ff'}
            onBlur={(e) => e.target.style.borderColor = '#2a2a3d'}
          />

          {error && (
            <div className="mt-3 px-4 py-2 rounded-xl text-sm"
              style={{
                background: 'rgba(255,101,132,0.1)',
                border: '1px solid rgba(255,101,132,0.3)',
                color: '#ff6584'
              }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 py-4 rounded-2xl text-white font-bold text-base tracking-wide transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
              boxShadow: '0 6px 30px rgba(108,99,255,0.35)'
            }}>
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                AI is evaluating...
              </span>
            ) : (
              '✦ Submit Answer'
            )}
          </button>
        </div>
      )}

      {/* Next Question Button */}
      {showFeedback && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 hover:-translate-y-1"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: '#1c1c27',
            border: '1px solid #6c63ff',
            color: '#6c63ff'
          }}>
          Next Question →
        </button>
      )}

    </div>
  )
}

export default InterviewScreen