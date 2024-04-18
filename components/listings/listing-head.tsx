'use client';

import Heading from '@/components/heading';
import HeartButton from '@/components/heart-button';
import useCountries from '@/hooks/use-countries';
import { SafeUser } from '@/types';
import Image from 'next/image';

type ListingHeadProps = {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
};

const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative '>
        <Image
          alt='image'
          src={imageSrc}
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover w-full '
        />
        <div className='absolute top-5 right-5 '>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
