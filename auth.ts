import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';

const test = process.env.NEXTAUTH_SECRET;
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {},
  callbacks: {},
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
