"use client"

import { useState } from "react"
import { RotateCcw, Trophy, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Question {
  question: string
  options: string[]
  correct: number
}

interface QuizData {
  [key: string]: Question[]
}

interface QuizAppProps {
  quizData: QuizData
}

export default function QuizApp({ quizData }: QuizAppProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [showNextButton, setShowNextButton] = useState(false)

  const topics = Object.keys(quizData)
  const currentQuestions = selectedTopic ? quizData[selectedTopic] : []

  const startQuiz = (topic: string) => {
    setSelectedTopic(topic)
    setQuizStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)

    if (answerIndex === currentQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setAnsweredQuestions([...answeredQuestions, answerIndex])

    // Show next button after 2 seconds to give time to review
    setTimeout(() => {
      setShowNextButton(true)
    }, 2000)
  }

  const proceedToNext = () => {
    if (currentQuestion + 1 < currentQuestions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowNextButton(false)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setSelectedTopic("")
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
    setShowNextButton(false)
  }

  const getScoreColor = () => {
    const percentage = (score / currentQuestions.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    const percentage = (score / currentQuestions.length) * 100
    if (percentage >= 80) return "Excellent! 🎉"
    if (percentage >= 60) return "Good job! 👍"
    if (percentage >= 40) return "Not bad! 🤔"
    return "Keep practicing! 💪"
  }

  if (!quizStarted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Challenge</h2>
          <p className="text-gray-600">Select a topic to begin your quiz journey</p>
        </div>

        <div className="space-y-4">
          <Select onValueChange={startQuiz}>
            <SelectTrigger className="w-full h-14 text-lg border-2 border-gray-200 hover:border-purple-300 transition-colors">
              <SelectValue placeholder="Select a quiz topic..." />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic} className="text-lg py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {topic === "General Knowledge" && "🌍"}
                      {topic === "Science" && "🔬"}
                      {topic === "History" && "📚"}
                      {topic === "Technology" && "💻"}
                    </span>
                    {topic}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => startQuiz(topic)}
                className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {topic === "General Knowledge" && "🌍"}
                    {topic === "Science" && "🔬"}
                    {topic === "History" && "📚"}
                    {topic === "Technology" && "💻"}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {topic}
                    </h3>
                    <p className="text-sm text-gray-500">{quizData[topic].length} questions</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">{getScoreMessage()}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
          <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {score}/{currentQuestions.length}
          </div>
          <p className="text-lg text-gray-600 mb-4">
            You scored{" "}
            <span className={`font-bold ${getScoreColor()}`}>
              {Math.round((score / currentQuestions.length) * 100)}%
            </span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(score / currentQuestions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            Topic: <span className="font-semibold">{selectedTopic}</span>
          </p>
        </div>

        <Button
          onClick={restartQuiz}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Another Quiz
        </Button>
      </div>
    )
  }

  const question = currentQuestions[currentQuestion]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {selectedTopic}
          </span>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {currentQuestions.length}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
          ></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">{question.question}</h2>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          let buttonClass =
            "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] "

          if (selectedAnswer === null) {
            buttonClass += "border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-white"
          } else if (index === question.correct) {
            buttonClass += "border-green-500 bg-green-100 text-green-800"
          } else if (index === selectedAnswer) {
            buttonClass += "border-red-500 bg-red-100 text-red-800"
          } else {
            buttonClass += "border-gray-200 bg-gray-50 text-gray-500"
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={buttonClass}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg">{option}</span>
                {selectedAnswer !== null && index === question.correct && (
                  <span className="ml-auto text-green-600">✓</span>
                )}
                {selectedAnswer === index && index !== question.correct && (
                  <span className="ml-auto text-red-600">✗</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600">
              {selectedAnswer === question.correct ? (
                <span className="text-green-600 font-medium">🎉 Correct! Well done!</span>
              ) : (
                <span className="text-red-600 font-medium">
                  ❌ Incorrect. The correct answer is: <strong>{question.options[question.correct]}</strong>
                </span>
              )}
            </p>
          </div>

          {showNextButton && (
            <div className="text-center">
              <Button
                onClick={proceedToNext}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {currentQuestion + 1 < currentQuestions.length ? "Next Question" : "View Results"}
                <span className="ml-2">→</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
