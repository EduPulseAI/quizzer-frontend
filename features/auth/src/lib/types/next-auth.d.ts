import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User extends DefaultUser {
    id: string;
    roles: string[];
    jwtToken?: string;
    refreshToken?: string;
    expiration?: number;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    jwtToken: string;
    refreshToken: string;
    roles: string[]
    expiration: number
  }
}
