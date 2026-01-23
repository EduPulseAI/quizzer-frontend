'use client';

import type { ApiResponse } from '@edupulse/api-client';
import type { SubmitLoginRequest } from '@edupulse/profile';
import { Button } from '@feature/ui/components/button';
import { CardContent, CardFooter } from '@feature/ui/components/card';
import { Input } from '@feature/ui/components/input';
import { Label } from '@feature/ui/components/label';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from 'react';

interface Props {
  action: (
    prevState: ApiResponse<SubmitLoginRequest>,
    formData: FormData
  ) => Promise<ApiResponse<SubmitLoginRequest>>;
  initialState?: ApiResponse<SubmitLoginRequest>;
}

export function LoginForm({
  action,
  initialState = {
    data: {
      email: '',
      password: '',
    },
  },
}: Props) {
  const [formState, formAction, isPending] = useActionState(
    action,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (formState?.success) {
      router.push("/dashboard")
    }

  }, [formState?.success]);

  const extractError = (key: string) => {
    if (formState?.error && formState.error.errors) {
      return formState.error.errors[key] || '';
    }
    return '';
  };

  return (
    <form action={formAction}>
      <CardContent className="space-y-4">
        {/* email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              id="email"
              type="email"
              name="email"
              defaultValue={formState?.data.email}
              placeholder="you@example.com"
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
            {extractError('email')}
          </div>
        </div>

        {/* password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-300">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              defaultValue={formState?.data.password}
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
            {extractError('password')}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link
            // href="/forgot-password"
            href="#forgot-password"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-[1.02]"
          disabled={isPending}
        >
          {isPending ? 'Signing in...' : 'Sign In'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>


      </CardFooter>
    </form>
  );
}

export default LoginForm;
