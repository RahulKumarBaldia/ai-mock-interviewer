function FeedbackCard({ feedback }) {
  const scoreColor = feedback.score >= 8
    ? { bg: 'rgba(67,232,158,0.1)', border: 'rgba(67,232,158,0.2)', text: '#43e89e' }
    : feedback.score >= 5
      ? { bg: 'rgba(255,193,7,0.1)', border: 'rgba(255,193,7,0.2)', text: '#ffc107' }
      : { bg: 'rgba(255,101,132,0.1)', border: 'rgba(255,101,132,0.2)', text: '#ff6584' }

  return (
    <div className="rounded-2xl p-6 mb-4 animate-[fadeUp_0.4s_ease_both]"
      style={{ background: '#13131a', border: '1px solid #2a2a3d' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(108,99,255,0.12)',
              border: '1px solid rgba(108,99,255,0.2)'
            }}>
            🤖
          </div>
          <span className="font-bold text-sm"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            AI Feedback
          </span>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: scoreColor.bg,
            border: `1px solid ${scoreColor.border}`
          }}>
          <span className="text-lg font-extrabold"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: scoreColor.text
            }}>
            {feedback.score}
          </span>
          <span className="text-xs text-[#7a7a9a]">/10</span>
        </div>
      </div>

      {/* Score Bar */}
      <div className="rounded-full h-1.5 overflow-hidden mb-5"
        style={{ background: '#1c1c27' }}>
        <div className="h-full rounded-full transition-all duration-[1000ms] ease-out"
          style={{
            width: `${feedback.score * 10}%`,
            background: feedback.score >= 8
              ? 'linear-gradient(90deg, #43e89e, #1fd07e)'
              : feedback.score >= 5
                ? 'linear-gradient(90deg, #ffc107, #ff9f0a)'
                : 'linear-gradient(90deg, #ff6584, #ff3860)'
          }} />
      </div>

      {/* Feedback Text */}
      <div className="mb-4 p-4 rounded-xl"
        style={{ background: '#1c1c27', borderLeft: '3px solid #6c63ff' }}>
        <p className="text-xs text-[#7a7a9a] mb-1 font-medium">Feedback</p>
        <p className="text-sm text-[#f0f0ff] leading-relaxed">
          {feedback.feedback}
        </p>
      </div>

      {/* Ideal Answer */}
      <div className="p-4 rounded-xl"
        style={{ background: '#1c1c27', borderLeft: '3px solid #43e89e' }}>
        <p className="text-xs text-[#43e89e] mb-1 font-medium">Ideal Answer</p>
        <p className="text-sm text-[#f0f0ff] leading-relaxed">
          {feedback.idealAnswer}
        </p>
      </div>

    </div>
  )
}

export default FeedbackCard