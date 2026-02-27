'use server';

import { withApi } from '@next-feature/client/server';
import { z } from 'zod';
import api from '../config/client';
import type { User } from 'next-auth';
import { signIn } from '../auth';

/**
 * [submit-login]
 * next-feature@0.1.2-10
 * February 26th 2026, 4:49:54 pm
 */
const submitLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type SubmitLoginRequest = z.infer<typeof submitLoginSchema>;
export type SubmitLoginResponse = {
  token: { value: string; issuedAt: Date; expiration: Date };
  user: User;
  verificationToken: string;
};

export const submitLogin = withApi(
  async (options: Partial<Record<'email' | 'password', unknown>>) => {
    const parsed = submitLoginSchema.safeParse(options);

    if (!parsed.success) {
      throw parsed.error;
    }

    const endpoint = '/api/auth/login';
    const response = await api.post<SubmitLoginResponse>(endpoint, parsed.data);
    return {
      jwtToken: response.token.value,
      refreshToken: response.verificationToken,
      email: response.user.email,
      name: response.user.name,
      roles: response.user.roles,
      id: response.user.id,
      image: response.user.image,
      expiration: new Date(response.token.expiration).getTime()
    } as User;
  },
  {},
);

/**
 * [submit-refresh]
 * next-feature@0.1.2-10
 * February 26th 2026, 5:08:21 pm
 */
const submitRefreshSchema = z.object({
  token: z.string(),
});
export type SubmitRefreshRequest = z.infer<typeof submitRefreshSchema>;

export const submitRefresh = withApi(async (token: string) => {
  const parsed = submitRefreshSchema.safeParse({ token });

  if (!parsed.success) {
    throw parsed.error;
  }

  const endpoint = '/api/auth/refresh';
  const response = await api.post<SubmitLoginResponse>(endpoint, parsed.data);
  return response;
}, {});

/**
 * [login]
 * next-feature@0.1.2-10
 * February 26th 2026, 8:36:23 pm
 */

export const login = withApi(async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const parsed = submitLoginSchema.safeParse({ email, password });

  if (!parsed.success) {
    throw parsed.error;
  }

  await signIn('credentials', {
    ...parsed.data,
    redirect: false,
  });
}, {});

/**
 * [signup]
 * next-feature@0.1.2-10
 * February 26th 2026, 9:52:02 pm
 */
const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });
export type SignupRequest = z.infer<typeof signupSchema>;
export type SignupResponse = {};

export const signup = withApi(async (formData: FormData) => {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  const parsed = signupSchema.safeParse({
    name: [firstName, lastName].join(" "),
    email,
    password,
    confirmPassword
  });

  if (!parsed.success) {
    throw parsed.error;
  }

  const endpoint = '/api/auth/signup';
  const response = await api.post<SignupResponse>(endpoint, parsed.data);
  return response;
}, {});
