'use client';

import type { ApiResponse } from '@edupulse/api-client';
import type { SubmitSignupRequest } from '@edupulse/profile';
import { Button } from '@feature/ui/components/button';
import { CardContent, CardFooter } from '@feature/ui/components/card';
import { Input } from '@feature/ui/components/input';
import { Label } from '@feature/ui/components/label';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import React, { useActionState } from 'react';

interface Props {
  action: (
    prevState: ApiResponse<SubmitSignupRequest>,
    formData: FormData
  ) => Promise<ApiResponse<SubmitSignupRequest>>;
  initialState?: ApiResponse<SubmitSignupRequest>;
}

export function SignupForm({
  action,
  initialState = {
    data: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  },
}: Props) {
  const [formState, formAction, isPending] = useActionState(
    action,
    initialState
  );

  const extractError = (key: string) => {
    if (formState?.error && formState.error.errors) {
      return formState.error.errors[key] || '';
    }
    return '';
  };

  return (
    <form action={formAction}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-300">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
            {extractError('name')}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
            {extractError('email')}
          </div>
        </div>
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
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
            {extractError('password')}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-slate-300">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
            {extractError('confirmPassword')}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-[1.02]"
          disabled={isPending}
        >
          {isPending ? 'Creating account...' : 'Create Account'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default SignupForm;
