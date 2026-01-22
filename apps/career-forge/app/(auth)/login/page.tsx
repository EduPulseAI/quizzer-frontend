import { submitLoginAction } from '@edupulse/profile';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@feature/ui/components/card';
import { Sparkles } from 'lucide-react';
import type React from 'react';
import LoginForm from '../../../components/auth/login-form';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md relative z-10 bg-slate-900/80 backdrop-blur-xl border-blue-500/20 shadow-2xl shadow-blue-500/10">
      <CardHeader className="space-y-1 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/50 animate-glow">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-slate-400">
          Sign in to continue your career journey
        </CardDescription>
      </CardHeader>
      <LoginForm action={submitLoginAction} />
    </Card>
  );
}
