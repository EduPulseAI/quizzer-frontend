import React from 'react';
import { QuizApp } from '../components/quiz-app';

export default function Index() {
  return(
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">🧠 Quiz Master</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge across different topics. Select a category and challenge yourself!
          </p>
        </div>
        <QuizApp />
      </div>
    </main>
  );
}
