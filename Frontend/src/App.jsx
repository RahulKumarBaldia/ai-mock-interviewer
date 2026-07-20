import { useState, useEffect } from 'react'
import Header from './components/Header'
import SetupScreen from './components/SetupScreen'
import InterviewScreen from './components/InterviewScreen'
import ReportScreen from './components/ReportScreen'

function App() {
  // ✅ localStorage se state load karo
  const [appState, setAppState] = useState(() => {
    return localStorage.getItem('appState') || 'setup'
  })

  const [interviewData, setInterviewData] = useState(() => {
    const saved = localStorage.getItem('interviewData')
    return saved ? JSON.parse(saved) : {
      interviewId: null,
      role: '',
      company: '',
      difficulty: '',
      currentQuestion: '',
      questionNumber: 1,
      totalQuestions: 10,
    }
  })

  const [reportData, setReportData] = useState(() => {
    const saved = localStorage.getItem('reportData')
    return saved ? JSON.parse(saved) : null
  })

  // ✅ State change hone par localStorage update karo
  useEffect(() => {
    localStorage.setItem('appState', appState)
  }, [appState])

  useEffect(() => {
    localStorage.setItem('interviewData', JSON.stringify(interviewData))
  }, [interviewData])

  useEffect(() => {
    if (reportData) {
      localStorage.setItem('reportData', JSON.stringify(reportData))
    }
  }, [reportData])

  const handleStartInterview = (data) => {
    setInterviewData(data)
    setAppState('interview')
  }

  const handleInterviewComplete = (report) => {
    setReportData(report)
    setAppState('report')
  }

  // ✅ Reset par localStorage bhi clear karo
  const handleReset = () => {
    localStorage.removeItem('appState')
    localStorage.removeItem('interviewData')
    localStorage.removeItem('reportData')
    setInterviewData({
      interviewId: null,
      role: '',
      company: '',
      difficulty: '',
      currentQuestion: '',
      questionNumber: 1,
      totalQuestions: 10,
    })
    setReportData(null)
    setAppState('setup')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0ff] font-sans relative">

      {/* BG Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10 pb-20">
        <Header />

        {appState === 'setup' && (
          <SetupScreen onStart={handleStartInterview} />
        )}

        {appState === 'interview' && (
          <InterviewScreen
            interviewData={interviewData}
            setInterviewData={setInterviewData}
            onComplete={handleInterviewComplete}
            onExit={() => {
              localStorage.removeItem('appState')
              localStorage.removeItem('interviewData')
              localStorage.removeItem('reportData')
              setAppState('setup')
            }}
          />
        )}

        {appState === 'report' && reportData && (
          <ReportScreen
            data={reportData}
            interviewData={interviewData}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}

export default App