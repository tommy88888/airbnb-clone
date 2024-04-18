'use client';

import Image from 'next/image';

type HeroProps = {};

const Hero = () => {
  return (
    <div className='relative w-full '>
      <div className='absolute -z-10 w-full '>
        <Image
          src='/images/hero.jpg'
          alt='hero'
          width={1000}
          height={700}
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover w-full '
        />
      </div>
    </div>
  );
};

export default Hero;
