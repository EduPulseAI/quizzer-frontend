import { ApiError } from '@next-feature/client';
import NextAuth, { AuthError, CredentialsSignin } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { submitLogin, submitRefresh } from '../actions/login';
import { TOKEN_EXPIRATION_SKEW } from '../config/env';
import type { Session, User } from '../types/next-auth';
import { authConfig } from './auth.config';


export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  logger: {
    error(error) {
      if (error instanceof ApiError) {
        console.error("[auth][error]", error.body);
        return ;
      }
      console.error("[auth][error]", error.name, error)
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await submitLogin(credentials);
        if (response.success) {
          return response.data;
        }

        console.error("authorize#error", response.error);
        if (response.error.body.title === "EmailNotFoundException") {
          throw new CredentialsSignin("Email not found")
        }

        throw new AuthError(response.error.message)
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
        token.jwtToken = user.jwtToken;
        token.refreshToken = user.refreshToken;
        token.expiration = user.expiration;
      }
      
      // handle refresh
      const now = Date.now();
      const tokenExpiration = token.expiration - TOKEN_EXPIRATION_SKEW;
      if (now >= tokenExpiration) {
        console.log("callback#jwt refreshing token")
        const response = await submitRefresh(token.refreshToken);
        if (response.success) {
          token.jwtToken = response.data.token.value;
          token.expiration = new Date(response.data.token.expiration).getTime();
          token.refreshToken = response.data.verificationToken;
          token.roles = response.data.user.roles;
        } else {
          token.error = response.error.body.title
          console.error("jwt#refreshError", response.error);
        }
      }



      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      // console.log("callback#session", { session, token })
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.roles = token.roles as string[];
        session.user.jwtToken = token.jwtToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.expiration = token.expiration;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});



