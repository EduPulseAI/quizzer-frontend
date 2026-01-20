
import { startSession } from "@edupulse/session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


interface Props {
  topicId: string;
  studentId: string;
  children: ReactNode;
}

export function SelectTopicButton({ topicId, studentId, children }: Props) {
  return (
    <form>
      <button
        formAction={async () => {
          "use server"
          const response = await startSession({ studentId, topicId });
          console.log("SelectTopicButton", response)
          if (response.success) {
            redirect("/session/" + response.data.sessionId)
          }
        }}

        className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-left group"
      >
        {children}
      </button>
    </form>
  );
}

export default SelectTopicButton;
