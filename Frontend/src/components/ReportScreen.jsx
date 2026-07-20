import { useEffect, useRef } from 'react'

function ReportScreen({ data, interviewData, onReset }) {
  const scoreRef = useRef(null)
  const barRef = useRef(null)

  const { report, questions } = data
  const { role, company, difficulty } = interviewData

  // Animate score counter
  useEffect(() => {
    let cur = 0
    const target = report.overallScore
    const timer = setInterval(() => {
      cur = Math.min(cur + 2, target)
      if (scoreRef.current) scoreRef.current.textContent = cur
      if (cur >= target) clearInterval(timer)
    }, 18)
    return () => clearInterval(timer)
  }, [report.overallScore])

  // Animate score bar
  useEffect(() => {
    setTimeout(() => {
      if (barRef.current) barRef.current.style.width = report.overallScore + '%'
    }, 100)
  }, [report.overallScore])

  const getScoreTag = (score) => {
    if (score >= 80) return { label: '✦ Excellent Performance', bg: 'rgba(67,232,158,0.1)', color: '#43e89e', border: 'rgba(67,232,158,0.2)' }
    if (score >= 60) return { label: '⚡ Good — Keep Improving', bg: 'rgba(255,193,7,0.1)', color: '#ffc107', border: 'rgba(255,193,7,0.2)' }
    return { label: '✕ Needs More Practice', bg: 'rgba(255,101,132,0.1)', color: '#ff6584', border: 'rgba(255,101,132,0.2)' }
  }

  const tag = getScoreTag(report.overallScore)

  return (
    <div className="animate-[fadeUp_0.5s_ease_both]">

      {/* Header */}
      <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
        <h2 className="text-2xl font-extrabold"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          Interview Complete ✦
        </h2>
        <button onClick={onReset}
          className="text-sm px-4 py-2 rounded-xl border text-[#7a7a9a] hover:text-[#f0f0ff] hover:border-[#6c63ff] transition-all duration-200"
          style={{ background: '#1c1c27', borderColor: '#2a2a3d' }}>
          ← New Interview
        </button>
      </div>

      {/* Interview Info */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
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
            background: 'rgba(255,193,7,0.1)',
            border: '1px solid rgba(255,193,7,0.2)',
            color: '#ffc107'
          }}>
          {difficulty}
        </span>
      </div>

      {/* Overall Score Card */}
      <div className="relative rounded-2xl p-8 mb-5 overflow-hidden"
        style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(108,99,255,0.12), transparent 70%)'
          }} />

        <p className="text-xs uppercase tracking-widest text-[#7a7a9a] font-medium mb-3">
          Overall Score
        </p>

        <div className="flex items-end gap-2 mb-5">
          <span ref={scoreRef}
            className="text-7xl font-extrabold leading-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
            0
          </span>
          <span className="text-xl text-[#7a7a9a] mb-3">/100</span>
        </div>

        <div className="rounded-full h-2 overflow-hidden mb-3"
          style={{ background: '#1c1c27' }}>
          <div ref={barRef}
            className="h-full rounded-full transition-all duration-[1200ms] ease-out"
            style={{
              width: '0%',
              background: 'linear-gradient(90deg, #6c63ff, #ff6584)'
            }} />
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
          style={{ background: tag.bg, color: tag.color, borderColor: tag.border }}>
          {tag.label}
        </span>
      </div>

      {/* Verdict */}
      <div className="rounded-2xl p-6 mb-4"
        style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
            style={{
              background: 'rgba(108,99,255,0.12)',
              border: '1px solid rgba(108,99,255,0.2)'
            }}>
            💬
          </div>
          <h3 className="font-bold text-base"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            AI Verdict
          </h3>
        </div>
        <p className="text-sm text-[#f0f0ff] leading-relaxed pl-12">
          {report.verdict}
        </p>
      </div>

      {/* Strengths + Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Strengths */}
        <div className="rounded-2xl p-6"
          style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
              style={{
                background: 'rgba(67,232,158,0.12)',
                border: '1px solid rgba(67,232,158,0.2)'
              }}>
              ✅
            </div>
            <h3 className="font-bold text-base"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Strengths
            </h3>
          </div>
          <ul className="flex flex-col gap-3">
            {report.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#43e89e] flex-shrink-0 mt-1.5" />
                <span className="text-[#f0f0ff]">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="rounded-2xl p-6"
          style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
              style={{
                background: 'rgba(255,101,132,0.12)',
                border: '1px solid rgba(255,101,132,0.2)'
              }}>
              💡
            </div>
            <h3 className="font-bold text-base"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Improve Karo
            </h3>
          </div>
          <ul className="flex flex-col gap-3">
            {report.improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6584] flex-shrink-0 mt-1.5" />
                <span className="text-[#f0f0ff]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Questions Review */}
      <div className="rounded-2xl p-6"
        style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
            style={{
              background: 'rgba(108,99,255,0.12)',
              border: '1px solid rgba(108,99,255,0.2)'
            }}>
            📝
          </div>
          <h3 className="font-bold text-base"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Questions Review
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <div key={i} className="p-4 rounded-xl"
              style={{ background: '#1c1c27' }}>

              {/* Question + Score */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-sm font-medium text-[#f0f0ff] leading-relaxed flex-1">
                  Q{i + 1}: {q.question}
                </p>
                <span className="text-sm font-bold flex-shrink-0 px-2 py-0.5 rounded-lg"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    background: q.score >= 8
                      ? 'rgba(67,232,158,0.1)'
                      : q.score >= 5
                        ? 'rgba(255,193,7,0.1)'
                        : 'rgba(255,101,132,0.1)',
                    color: q.score >= 8 ? '#43e89e' : q.score >= 5 ? '#ffc107' : '#ff6584'
                  }}>
                  {q.score}/10
                </span>
              </div>

              {/* Your Answer */}
              <div className="mb-2">
                <p className="text-xs text-[#7a7a9a] mb-1">Your Answer:</p>
                <p className="text-xs text-[#f0f0ff] leading-relaxed">
                  {q.userAnswer}
                </p>
              </div>

              {/* AI Feedback */}
              <div className="pt-2"
                style={{ borderTop: '1px solid #2a2a3d' }}>
                <p className="text-xs text-[#6c63ff] mb-1">AI Feedback:</p>
                <p className="text-xs text-[#7a7a9a] leading-relaxed">
                  {q.aiFeedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ReportScreen