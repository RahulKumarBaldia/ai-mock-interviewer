import Groq from 'groq-sdk'
import dotenv from 'dotenv'

dotenv.config()

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const companyContext = {
  'Google': {
    focus: 'algorithms, scalability, system design, clean code, performance',
    style: 'Google asks deeply technical questions focused on problem solving and scalability',
  },
  'Microsoft': {
    focus: 'OOP, system design, Azure cloud, REST APIs, debugging',
    style: 'Microsoft focuses on practical coding skills and system design',
  },
  'Amazon': {
    focus: 'AWS services, scalability, REST APIs, databases, leadership',
    style: 'Amazon focuses on scalable systems and practical backend experience',
  },
  'Flipkart': {
    focus: 'Node.js, MongoDB, REST APIs, payment systems, ecommerce backend',
    style: 'Flipkart focuses on full stack skills and ecommerce backend systems',
  },
  'Razorpay': {
    focus: 'payment systems, APIs, webhooks, security, JWT, encryption',
    style: 'Razorpay focuses heavily on API design, payment flows and security',
  },
  'Swiggy': {
    focus: 'real time systems, Socket.io, Node.js, MongoDB, location APIs, order management',
    style: 'Swiggy focuses on real time order tracking and location based systems',
  },
  'Zomato': {
    focus: 'Node.js, MongoDB, REST APIs, real time systems, restaurant management, Redis',
    style: 'Zomato focuses on food delivery systems, real time tracking and scalability',
  },
  'Startup': {
    focus: 'full stack, Node.js, React, MongoDB, REST APIs, quick delivery',
    style: 'Startups want versatile developers who can build fast and ship features',
  },
  'General': {
    focus: 'core backend concepts, Node.js, Express, MongoDB, REST APIs, authentication',
    style: 'General interview covering all important backend fundamentals',
  },
}

const questionBank = {
  Easy: {
    'Backend Developer': [
      'What is an API?',
      'What is middleware in Express.js?',
      'What is the difference between GET and POST requests?',
      'What is req.body in Express?',
      'What is MongoDB?',
      'What is async/await in JavaScript?',
      'What is npm?',
      'What is a route in Express.js?',
      'What is JSON?',
      'What is a callback function?',
      'What is Node.js?',
      'What is Express.js?',
      'What is dotenv and why do we use it?',
      'What is req.params in Express?',
      'What is req.query in Express?',
    ],
    'Node.js Developer': [
      'What is Node.js?',
      'What is npm?',
      'What is async/await?',
      'What is a callback function?',
      'What is Express.js?',
      'What is middleware?',
      'What is req.body?',
      'What is a REST API?',
      'What is MongoDB?',
      'What is dotenv?',
      'What is JSON?',
      'What is a route in Express?',
      'What is req.params?',
      'What is an API?',
      'What is a callback?',
    ],
    'Frontend Developer': [
      'What is React?',
      'What is a component in React?',
      'What is useState?',
      'What is props in React?',
      'What is useEffect?',
      'What is the difference between var, let, and const?',
      'What is CSS flexbox?',
      'What is a Promise in JavaScript?',
      'What is the DOM?',
      'What is an event listener?',
      'What is JSX?',
      'What is a functional component?',
      'What is CSS grid?',
      'What is localStorage?',
      'What is fetch API?',
    ],
    'Full Stack Developer': [
      'What is a REST API?',
      'What is React?',
      'What is Node.js?',
      'What is MongoDB?',
      'What is middleware?',
      'What is async/await?',
      'What is JWT?',
      'What is useState?',
      'What is Express.js?',
      'What is JSON?',
      'What is npm?',
      'What is dotenv?',
      'What is a callback?',
      'What is req.body?',
      'What is a route?',
    ],
  },
  Medium: {
    'Backend Developer': [
      'How does JWT authentication work?',
      'What is the difference between SQL and NoSQL?',
      'How do you handle errors in Express.js?',
      'What is CORS and how do you fix it?',
      'What is Mongoose and how do you use it?',
      'How does bcrypt work for password hashing?',
      'What are REST API principles?',
      'How do you validate request data in Express?',
      'What is the MVC pattern?',
      'How do environment variables work in Node.js?',
      'What is the difference between authentication and authorization?',
      'How do you connect MongoDB with Node.js?',
      'What is middleware chaining in Express?',
      'How do you handle async errors in Express?',
      'What is the purpose of the .env file?',
    ],
    'Node.js Developer': [
      'How does JWT work?',
      'What is the event loop in Node.js?',
      'How do you handle errors in async functions?',
      'What is CORS?',
      'How does bcrypt work?',
      'What is Mongoose?',
      'What is the MVC pattern?',
      'How do you validate data in Express?',
      'What is the difference between require and import?',
      'How do you structure a Node.js project?',
      'What is middleware chaining?',
      'How does async/await differ from Promises?',
      'What is error handling middleware in Express?',
      'How do you secure an API?',
      'What is rate limiting?',
    ],
    'Frontend Developer': [
      'What is Redux and when do you use it?',
      'How does useContext work?',
      'What is React Router?',
      'How do you call an API in React?',
      'What is the virtual DOM?',
      'What is prop drilling and how do you avoid it?',
      'How does useReducer work?',
      'What is lazy loading in React?',
      'How do you handle forms in React?',
      'What is a custom hook?',
      'What is the difference between controlled and uncontrolled components?',
      'How does React reconciliation work?',
      'What is memo in React?',
      'How do you optimize React performance?',
      'What is the difference between useEffect and useLayoutEffect?',
    ],
    'Full Stack Developer': [
      'How does JWT authentication work?',
      'What is CORS and how do you fix it?',
      'How do you connect React with a Node.js backend?',
      'What is Mongoose?',
      'How does bcrypt work?',
      'What is Redux?',
      'What is the MVC pattern?',
      'How do you handle errors in Express?',
      'What is React Router?',
      'How do environment variables work?',
      'What is the difference between SQL and NoSQL?',
      'How do you validate request data?',
      'What is a custom hook?',
      'How do you handle forms in React?',
      'What is middleware chaining?',
    ],
  },
  Hard: {
    'Backend Developer': [
      'How would you design a scalable REST API for millions of users?',
      'What is Redis and when would you use it?',
      'How does database indexing work and when should you use it?',
      'What is Docker and how does containerization work?',
      'How would you implement rate limiting in a Node.js API?',
      'What is microservices architecture and when would you use it?',
      'How do you handle database transactions in MongoDB?',
      'What is a CI/CD pipeline and how do you set it up?',
      'How would you secure a Node.js REST API in production?',
      'What is GraphQL and how is it different from REST?',
      'How would you implement real-time features using WebSockets?',
      'What is horizontal vs vertical scaling?',
      'How do you optimize slow database queries?',
      'What is a message queue and when would you use it?',
      'How would you implement caching in a Node.js application?',
    ],
  },
}

export const generateQuestion = async (role, difficulty, company, previousQuestions = []) => {
  const prev = previousQuestions.length > 0
    ? `ALREADY ASKED — DO NOT REPEAT ANY OF THESE:\n${previousQuestions.join('\n')}`
    : ''

  const ctx = companyContext[company] || companyContext['General']

  const topics = questionBank[difficulty]?.[role] ||
    questionBank[difficulty]?.['Backend Developer'] ||
    questionBank['Easy']['Backend Developer']

  const topicsList = topics.join('\n- ')

  const prompt = `
You are a strict technical interviewer at ${company}.
Role: ${role}
Difficulty: ${difficulty}

Company context:
${ctx.style}
Focus areas: ${ctx.focus}

Question bank — ONLY pick from these:
- ${topicsList}

${prev}

STRICT RULES:
- Pick EXACTLY ONE question from the question bank above
- The question MUST match ${difficulty} difficulty level
- Easy = simple definitions only — no architecture, no system design
- Medium = practical implementation questions only
- Hard = advanced architecture and system design only
- Make the question slightly relevant to ${company}'s focus: ${ctx.focus}
- NEVER repeat an already asked question
- Output the question ONLY — no introduction, no explanation, no numbering

Question:
`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 150,
  })

  return completion.choices[0].message.content.trim()
}

export const evaluateAnswer = async (question, answer, role, difficulty) => {

  // ✅ Minimum length check
  if (answer.trim().length < 10) {
    return {
      score: 0,
      feedback: 'Answer bahut chota hai! Please properly attempt karo.',
      idealAnswer: 'Please question ko dhyan se padho aur apni best knowledge se answer do.'
    }
  }

  // ✅ Meaningless answer check
  const meaninglessPatterns = [
    /^x+$/i,
    /^(.)\1+$/i,
    /^(ha)+$/i,
    /^test$/i,
    /^asdf/i,
    /^1234/,
    /^(.{1,3})\1{3,}/,
  ]

  const isMeaningless = meaninglessPatterns.some(pattern =>
    pattern.test(answer.trim())
  )

  if (isMeaningless) {
    return {
      score: 0,
      feedback: 'Yeh valid answer nahi hai! Random text ya repeated characters likhe hain. Please genuinely attempt karo.',
      idealAnswer: 'Seriously attempt karo — yeh app tumhari practice ke liye hai!'
    }
  }

  // ✅ "I don't know" variations check
  const dontKnowPatterns = [
    /^i\s*(don'?t|do not)\s*know/i,
    /^nahi\s*pata/i,
    /^mujhe\s*nahi\s*pata/i,
    /^no\s*idea/i,
    /^idk/i,
    /^pata\s*nahi/i,
    /^don'?t\s*know/i,
    /^not\s*sure/i,
    /^no\s*clue/i,
  ]

  const isDontKnow = dontKnowPatterns.some(pattern =>
    pattern.test(answer.trim())
  )

  if (isDontKnow) {
    return {
      score: 1,
      feedback: 'Candidate ne honestly admit kiya ki answer nahi pata. Practice karo aur dobara try karo!',
      idealAnswer: 'Please concept study karo aur dobara interview do!'
    }
  }

  // ✅ Question ko hi copy karke answer mein daalna check
  const questionWords = question.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
  const answerWords = answer.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()

  if (answerWords === questionWords || answerWords.includes(questionWords)) {
    return {
      score: 0,
      feedback: 'Tumne question ko hi answer mein copy kar diya! Yeh valid answer nahi hai.',
      idealAnswer: 'Question padhke apne words mein answer do — copy paste mat karo!'
    }
  }

  const prompt = `
You are an expert interviewer evaluating a candidate for ${role} role.
Difficulty: ${difficulty}

Question: ${question}
Candidate's Answer: ${answer}

IMPORTANT RULES FOR SCORING:
- If answer is completely irrelevant, random, or nonsensical — give score 0
- If answer says only "I don't know" or similar — give score 1
- If answer is partially correct — give score 3-5
- If answer is mostly correct — give score 6-8
- If answer is excellent — give score 9-10
- Candidate may answer in English, Hindi or Hinglish — evaluate the CONCEPT not the language
- Do NOT give high scores for vague or random answers
- Be strict — only reward genuine understanding

Evaluate and return JSON ONLY — no markdown, no explanation:
{
  "score": <number 0-10>,
  "feedback": "<2-3 lines — what was good, what was missing>",
  "idealAnswer": "<brief ideal answer in 2-3 lines>"
}
`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    max_tokens: 500,
  })

  const response = completion.choices[0].message.content
  const cleaned = response.replace(/```json/g, '').replace(/```/g, '').trim()
  return JSON.parse(cleaned)
}

// ✅ generateReport — yeh missing tha!
export const generateReport = async (role, questions) => {
  const summary = questions.map((q, i) =>
    `Q${i + 1}: ${q.question}\nAnswer: ${q.userAnswer}\nScore: ${q.score}/10`
  ).join('\n\n')

  const prompt = `
You are an expert career coach reviewing a mock interview for ${role} role.

Interview Summary:
${summary}

Return JSON ONLY — no markdown, no explanation:
{
  "overallScore": <number 0-100>,
  "strengths": ["<point 1>", "<point 2>", "<point 3>"],
  "improvements": ["<point 1>", "<point 2>", "<point 3>"],
  "verdict": "<2 line overall verdict>"
}
`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    max_tokens: 600,
  })

  const response = completion.choices[0].message.content
  const cleaned = response.replace(/```json/g, '').replace(/```/g, '').trim()
  return JSON.parse(cleaned)
}