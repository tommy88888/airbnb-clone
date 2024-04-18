import getCurrentUser from '@/actions/get-current-user';
import getListingById from '@/actions/get-listing-by-id';
import EmptyState from '@/components/empty-state';
import ListingClient from './listing-client';
import getReservations from '@/actions/get-reservations';
// import ClientOnly from '@/lib/client-only';

type ListingPageProps = {
  listingId?: string;
};

const ListingPage = async ({ params }: { params: ListingPageProps }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return (
      // <ClientOnly>
      <EmptyState />
      // </ClientOnly>
    );
  }

  return (
    // <ClientOnly>
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
    // </ClientOnly>
  );
};

export default ListingPage;
