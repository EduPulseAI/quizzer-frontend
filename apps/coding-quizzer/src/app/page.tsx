import { getTopics } from '@feature/topic';
import TopicsList from '@feature/topic/components/topics-list';
import { Target } from 'lucide-react';
import React from 'react';
import { HomeLayout } from "../components/home-layout";

export default async function Index() {
  const { success, data, error } = await getTopics();

  if (!success) {
    console.error("Error loading topics", error);
  }

  return (
    <HomeLayout>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-white"/>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Choose Your Challenge
          </h2>
          <p className="text-gray-600">
            Select a topic to begin your quiz journey
          </p>
        </div>
        <TopicsList topics={data}/>
      </div>
    </HomeLayout>
  );
}
