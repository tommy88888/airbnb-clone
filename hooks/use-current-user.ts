import { auth } from '@/auth';
import { db } from '@/lib/db';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

type CurrentUserProps = User & {
  createdAt: string;
  updatedAt: string;
  emailVerified?: string | null;
};

const useCurrentUser = (): {
  error: Error | null;
  currentUser: CurrentUserProps | null | undefined;
} => {
  const [currentUser, setCurrentUser] = useState<CurrentUserProps | undefined>(
    undefined
  );

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const session = await auth();

        if (!session?.user?.email) {
          setCurrentUser(undefined);
          return;
        }

        const user = await db.user.findUnique({
          where: {
            email: session.user.email,
          },
        });

        if (!user) {
          setCurrentUser(undefined);
          return;
        }

        setCurrentUser({
          ...user,
          createdAt: user.createdAt.toISOString() as any,
          updatedAt: user.updatedAt.toISOString() as any,
          emailVerified: (user.emailVerified?.toISOString() as any) || null,
        });
      } catch (err: any) {
        setError(err);
      }
    };

    fetchCurrentUser();
  }, []);

  return { error, currentUser };
};

export default useCurrentUser;
