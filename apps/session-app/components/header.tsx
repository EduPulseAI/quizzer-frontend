
import { ReactNode } from 'react';
import Image from "next/image";
import { Flame, Twitter, Zap, Map } from "lucide-react";
import { Badge } from "@feature/ui/components/badge"
import { Button } from "@feature/ui/components/button"
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle, SheetHeader } from "@feature/ui/components/sheet"
import { PROJECT_NAME } from "@feature/base/lib/constants/metadata";

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function Header(props: Props) {
  return (
    <header className="border-b sticky top-0 z-10 black-red-gradient backdrop-blur-md border-crimson-500/30 shadow-2xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative animate-float">
            <Image
              src="/logo.png"
              alt="EduPulse Session analytics"
              width={40}
              height={40}
              className="drop-shadow-2xl"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-crimson-500 rounded-full animate-pulse shadow-lg pulse-red"></div>
          </div>
          <div className="flex items-baseline md:flex hidden">
            {/*<h1 className={`${quicksand.className} text-2xl font-bold text-white tracking-tight drop-shadow-lg`}>*/}
            <h1 className={` text-2xl font-bold text-white tracking-tight drop-shadow-lg`}>
              Edu<span className="text-crimson-300">Pulse</span>
            </h1>
            <Flame className="w-5 h-5 ml-2 text-crimson-400 animate-pulse" />
            <span
              // className={`${quicksand.className} ml-2 text-sm font-medium bg-obsidian-900/80 text-crimson-200 px-3 py-1 rounded-full backdrop-blur-sm border border-crimson-500/50 shadow-lg red-neon-glow`}
              className={` ml-2 text-sm font-medium bg-obsidian-900/80 text-crimson-200 px-3 py-1 rounded-full backdrop-blur-sm border border-crimson-500/50 shadow-lg red-neon-glow`}
              style={{ letterSpacing: "0.05em" }}
            >
              v4.1
            </span>
          </div>
          <Badge
            variant="outline"
            className="ml-2 hidden md:flex bg-obsidian-900/60 text-crimson-200 border-crimson-500/40 shadow-lg backdrop-blur-sm red-neon-glow"
          >
            v4.1.0
          </Badge>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:block">
            <Badge
              variant="outline"
              className="font-mono bg-obsidian-900/60 text-white border-crimson-500/40 backdrop-blur-sm shadow-lg red-neon-glow"
            >
              <Zap className="w-3 h-3 mr-1 text-electric-300" />
              0.00
            </Badge>
          </div>

          {/* Twitter Link */}
          <a
            href="https://x.com/MINTZILLA_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
            title="Follow us on Twitter @MINTZILLA_"
            data-onboarding="twitter-button"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:bg-crimson-600/30 transition-all duration-300 hover:scale-110 glass-red border border-crimson-500/30"
            >
              <Twitter className="h-5 w-5" />
            </Button>
          </a>

          {/* Roadmap Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white hover:bg-obsidian-700/50 transition-all duration-300 hover:scale-110 glass-dark border border-obsidian-600/50"
                title="View Roadmap"
                data-onboarding="roadmap-button"
              >
                <Map className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col bg-gradient-to-br from-obsidian-900 via-obsidian-800 to-crimson-900 border-crimson-500/30">
              <SheetHeader>
                <SheetTitle className="text-crimson-200">Roadmap</SheetTitle>
                <SheetDescription className="text-obsidian-300">
                  See what features are coming to {PROJECT_NAME}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex-1 overflow-y-auto">
                {/*<Roadmap />*/}
                Roadmap
              </div>
            </SheetContent>
          </Sheet>

          {/*<ModeToggle />*/}
        </div>
      </div>
    </header>
  );
}

export default Header;
