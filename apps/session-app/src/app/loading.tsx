import React from 'react';
import { Flame } from "lucide-react"
import { PROJECT_DESCRIPTION } from "@feature/base"

interface Props {

}

function RootLoading(props: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-obsidian-900 via-blue-900 to-obsidian-800">
      {/*<Header />*/}
      <div className="container mx-auto px-4 py-6 flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-crimson-500 border-t-transparent mx-auto mb-4 red-neon-glow"></div>
            <Flame className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-crimson-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-black-red-gradient">Loading Session Manager...</h2>
          <p className="text-crimson-200">{PROJECT_DESCRIPTION}</p>
        </div>
      </div>
    </div>
  );
}

export default RootLoading;