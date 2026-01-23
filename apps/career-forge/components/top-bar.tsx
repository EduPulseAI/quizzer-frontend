'use client';

import { signOut } from '@edupulse/profile';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@feature/ui/components/avatar';
import { Button } from '@feature/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@feature/ui/components/dropdown-menu';
import { Input } from '@feature/ui/components/input';
import {
  Bell,
  CreditCard,
  LogOut,
  Search,
  User as UserIcon,
} from 'lucide-react';
import type { User } from 'next-auth';
import Link from 'next/link';

interface TopBarProps {
  user?: User | undefined;
}

export function TopBar({ user }: TopBarProps) {

  const handleLogout = async () => {
    await signOut({ redirectTo: "/login"})
  }

  const initials = () => {
    return (user?.name ?? "").split(" ")
      .map(n => n.at(0))
      .join("")
      .toUpperCase();
  }


  return (
    <header className="h-16 border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search projects, skills, jobs..."
            className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-400 hover:text-slate-200"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 hover:bg-slate-800/50">
              <Avatar className="h-8 w-8 ring-2 ring-blue-500/50">
                <AvatarImage src={`${user?.image}?height=32&width=32`} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  {initials()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-slate-200">{user?.name}</p>
                <p className="text-xs text-slate-500">Free Plan</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-slate-900 border-slate-800"
          >
            <DropdownMenuLabel className="text-slate-400">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="text-slate-300 focus:bg-slate-800 focus:text-slate-100">
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <Link href='/pricing'>
              <DropdownMenuItem
                className="text-slate-300 focus:bg-slate-800 focus:text-slate-100"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem
              className="text-red-400 focus:bg-red-950 focus:text-red-300"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
