'use client';

import EmptyState from '@/components/empty-state';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title='Uh Oh' subtitle='Something went wrong!' />;
};

export default Error;
