import getCurrentUser from '@/actions/get-current-user';
import getReservations from '@/actions/get-reservations';
import EmptyState from '@/components/empty-state';
// import ClientOnly from '@/lib/client-only';
import TripsClient from './trips-client';

type TripsPageProps = {};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      // <ClientOnly>
      <EmptyState title='Unauthorized' subtitle='Please login' />
      // </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      // <ClientOnly>
      <EmptyState
        title='No trips found'
        subtitle='Looks like you have not reserved any trips'
      />
      // </ClientOnly>
    );
  }

  return (
    // <ClientOnly>
    <TripsClient reservations={reservations} currentUser={currentUser} />
    // </ClientOnly>
  );
};

export default TripsPage;
