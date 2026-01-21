"use client"

import { startSession } from "@edupulse/session";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";


interface Props {
  topicId: string;
  studentId: string;
  children: ReactNode;
}

export function SelectTopicButton({ topicId, studentId, children }: Props) {
  const router = useRouter();

  const handleClick = async () => {
    const response = await startSession({ studentId, topicId });
    console.log("SelectTopicButton", response)
    if (response.success) {
      router.push("/session/" + response.data.sessionId)
    }
  };
  return (
      <button
        className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-left group"
        onClick={handleClick}
      >
        {children}
      </button>
  );
}

export default SelectTopicButton;
