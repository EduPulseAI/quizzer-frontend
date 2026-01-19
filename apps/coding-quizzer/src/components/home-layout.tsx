import React, { ReactNode } from 'react';
import { PROJECT_NAME } from "@feature/base";
import { auth, signIn } from "@feature/auth";
import { DEMO_MODE } from "../lib/config";


interface Props {
  children?: ReactNode;
}

export async function HomeLayout(props: Props) {
  const session = await auth();
  if (session === null || session.user === null) {
    signIn("credentials", { email: "charlie" })
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{PROJECT_NAME}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge across different topics. Select a category and challenge yourself!
          </p>
          {DEMO_MODE && (
            <button
              disabled={session != null}

            >
            {session != null ? "DEMO MODE" : "Enable demo user"}
          </button>)}
        </div>
        {props.children}
      </div>
    </main>
  );
}
