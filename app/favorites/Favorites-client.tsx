'use client';

import Container from '@/components/container';
import Heading from '@/components/heading';
import ListingCard from '@/components/listings/listing-card';
import { SafeListing, SafeUser } from '@/types';

type FavoritesClientProps = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

const FavoritesClient = ({ listings, currentUser }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title='Favorites' subtitle='List of your favorites places' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((fav) => (
          <ListingCard key={fav.id} data={fav} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
