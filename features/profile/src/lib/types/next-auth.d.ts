import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User extends DefaultUser {
    id: string;
    role: Role;
    jwtToken?: string;
    refreshToken?: string;
    expiration?: Date;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwtToken: string;
    expiration: Date;
    refreshToken: string;
  }
}
