'use client';

import { useRouter } from 'next/navigation';
import Heading from './heading';
import Btn from './ui/btn';

type EmptyStateProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center '>
      <Heading center title={title} subtitle={subtitle} />
      <div className='w-48 mt-4 '>
        {showReset && (
          <Btn
            outline
            label='Remove all filters'
            onClick={() => router.push('/')}
          ></Btn>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
