import QuizApp from "@/components/quiz-app"

// Sample quiz data - this could come from a database or API
const quizData = {
  "General Knowledge": [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correct: 1,
    },
    {
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1,
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2,
    },
  ],
  Science: [
    {
      question: "What is the speed of light in vacuum?",
      options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
      correct: 0,
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
      correct: 1,
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
      correct: 2,
    },
    {
      question: "What gas do plants absorb from the atmosphere during photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2,
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      correct: 2,
    },
  ],
  History: [
    {
      question: "Who was the first person to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
      correct: 1,
    },
    {
      question: "In which year did the Berlin Wall fall?",
      options: ["1987", "1988", "1989", "1990"],
      correct: 2,
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correct: 2,
    },
    {
      question: "Which ancient wonder of the world was located in Alexandria?",
      options: ["Hanging Gardens", "Lighthouse of Alexandria", "Colossus of Rhodes", "Temple of Artemis"],
      correct: 1,
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "George Washington"],
      correct: 3,
    },
  ],
  Technology: [
    {
      question: "What does 'HTTP' stand for?",
      options: [
        "HyperText Transfer Protocol",
        "High Tech Transfer Protocol",
        "HyperText Transport Protocol",
        "High Transfer Text Protocol",
      ],
      correct: 0,
    },
    {
      question: "Who founded Microsoft?",
      options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
      correct: 1,
    },
    {
      question: "What year was the first iPhone released?",
      options: ["2006", "2007", "2008", "2009"],
      correct: 1,
    },
    {
      question: "What does 'AI' stand for in technology?",
      options: [
        "Automated Intelligence",
        "Artificial Intelligence",
        "Advanced Intelligence",
        "Algorithmic Intelligence",
      ],
      correct: 1,
    },
    {
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correct: 2,
    },
  ],
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">🧠 Quiz Master</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge across different topics. Select a category and challenge yourself!
          </p>
        </div>
        <QuizApp quizData={quizData} />
      </div>
    </main>
  )
}
