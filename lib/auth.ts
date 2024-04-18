import { auth } from '@/auth';

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const session = async () => {
  const session = await auth();
  if (!session) throw new Error('No session');

  return session;
};
