import getCurrentUser from '@/actions/get-current-user';
import getListings, { IListingsParams } from '@/actions/get-listings';
import Container from '@/components/container';
import EmptyState from '@/components/empty-state';
// import Hero from '@/components/hero';
import ListingCard from '@/components/listings/listing-card';

// import { Button } from '@/components/ui/button';
// import ClientOnly from '@/lib/client-only';
// import Image from 'next/image';

export interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      // <ClientOnly>
      <EmptyState showReset />
      // {/* </ClientOnly> */}
    );
  }

  return (
    // <ClientOnly>
    <Container>
      <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
    // </ClientOnly>
  );
};

export default Home;
