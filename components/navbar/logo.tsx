'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type LogoProps = {};

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/')}
      src='/images/logo.svg'
      alt='logo'
      height={40}
      width={100}
      sizes='(max-width: 100px) 5vw, 10vw'
      priority
      className='hidden object-cover w-auto h-auto md:block cursor-pointer'
      style={{
        width: '8%',
        height: 'auto',
      }}
    />
  );
};

export default Logo;
