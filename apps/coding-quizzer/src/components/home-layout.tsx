import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export function HomeLayout(props: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Eva IT Quiz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge across different topics. Select a category and challenge yourself!
          </p>
        </div>
        {props.children}
      </div>
    </main>
  );
}
