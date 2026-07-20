import { useState } from 'react'

const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'React Developer',
  'Node.js Developer',
  'DevOps Engineer',
  'Data Scientist',
  'UI/UX Designer',
]

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

const COMPANIES = [
  'Google',
  'Microsoft',
  'Amazon',
  'Flipkart',
  'Razorpay',
  'Swiggy',
  'Zomato',
  'Startup',
  'General',
]

function SetupScreen({ onStart }) {
  const [role, setRole] = useState('')
  const [customRole, setCustomRole] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [company, setCompany] = useState('General')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleStart = async () => {
    const finalRole = role === 'custom' ? customRole : role

    if (!finalRole) {
      setError('Please select or enter a role!')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: finalRole,
          company,
          difficulty,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong!')
        setLoading(false)
        return
      }

      onStart({
        interviewId: data.interviewId,
        role: finalRole,
        company,
        difficulty,
        currentQuestion: data.question,
        questionNumber: 1,
        totalQuestions: 10,
      })

    } catch (err) {
      setError('Backend se connect nahi ho pa raha — server chalu hai?')
      setLoading(false)
    }
  }

  return (
    <div className="animate-[fadeUp_0.5s_ease_both]">

      {/* Card */}
      <div className="rounded-2xl p-8"
        style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>

        <h2 className="text-2xl font-extrabold mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          Setup Your Interview
        </h2>
        <p className="text-[#7a7a9a] text-sm mb-8">
          Choose your role, company and difficulty — AI will interview you!
        </p>

        {/* Role Select */}
        <div className="mb-6">
          <label className="text-sm font-medium text-[#7a7a9a] mb-2 block">
            Job Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: '#1c1c27',
              border: '1px solid #2a2a3d',
              color: '#f0f0ff',
            }}>
            <option value="">Select a role...</option>
            {ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
            <option value="custom">Custom Role (type below)</option>
          </select>

          {/* Custom Role Input */}
          {role === 'custom' && (
            <input
              type="text"
              placeholder="e.g. React Native Developer"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="w-full mt-3 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                background: '#1c1c27',
                border: '1px solid #6c63ff',
                color: '#f0f0ff',
              }}
            />
          )}
        </div>

        {/* Company Select */}
        <div className="mb-6">
          <label className="text-sm font-medium text-[#7a7a9a] mb-2 block">
            Company
          </label>
          <div className="flex flex-wrap gap-2">
            {COMPANIES.map(c => (
              <button
                key={c}
                onClick={() => setCompany(c)}
                className="px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                style={{
                  background: company === c ? 'rgba(108,99,255,0.2)' : '#1c1c27',
                  border: company === c ? '1px solid #6c63ff' : '1px solid #2a2a3d',
                  color: company === c ? '#6c63ff' : '#7a7a9a',
                }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Select */}
        <div className="mb-8">
          <label className="text-sm font-medium text-[#7a7a9a] mb-2 block">
            Difficulty
          </label>
          <div className="flex gap-3">
            {DIFFICULTIES.map(d => {
              const colors = {
                Easy: { active: 'rgba(67,232,158,0.15)', border: '#43e89e', text: '#43e89e' },
                Medium: { active: 'rgba(255,193,7,0.15)', border: '#ffc107', text: '#ffc107' },
                Hard: { active: 'rgba(255,101,132,0.15)', border: '#ff6584', text: '#ff6584' },
              }
              const isActive = difficulty === d
              return (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? colors[d].active : '#1c1c27',
                    border: isActive ? `1px solid ${colors[d].border}` : '1px solid #2a2a3d',
                    color: isActive ? colors[d].text : '#7a7a9a',
                  }}>
                  {d}
                </button>
              )
            })}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm"
            style={{
              background: 'rgba(255,101,132,0.1)',
              border: '1px solid rgba(255,101,132,0.3)',
              color: '#ff6584'
            }}>
            {error}
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-white font-bold text-base tracking-wide transition-all duration-300 hover:-translate-y-1 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
            boxShadow: '0 6px 30px rgba(108,99,255,0.35)'
          }}>
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Generating first question...
            </span>
          ) : (
            '✦ Start Interview'
          )}
        </button>

      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { icon: '🎯', title: '10 Questions', desc: 'Per session' },
          { icon: '⚡', title: 'Instant Feedback', desc: 'After each answer' },
          { icon: '📊', title: 'Final Report', desc: 'Score + tips' },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-4 text-center"
            style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-sm font-semibold mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              {item.title}
            </div>
            <div className="text-xs text-[#7a7a9a]">{item.desc}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default SetupScreen