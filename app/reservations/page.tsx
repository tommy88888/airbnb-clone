// import ClientOnly from '@/lib/client-only';

import getCurrentUser from '@/actions/get-current-user';
import getReservations from '@/actions/get-reservations';
import EmptyState from '@/components/empty-state';
import TripsClient from '../trips/trips-client';
import ReservationsClient from './reservations-client';

type ReservationsPageProps = {};

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  console.log('🚀 ~ ReservationsPage ~ currentUser:', currentUser);

  if (!currentUser) {
    return (
      // <ClientOnly>
      <EmptyState title='Unauthorized' subtitle='Please login' />
      // </ClientOnly>
    );
  }
  const reservations = await getReservations({
    authorId: currentUser.id,
  });
  console.log('🚀 ~ ReservationsPage ~ reservations:', reservations);

  if (reservations.length === 0) {
    return (
      // <ClientOnly>
      <EmptyState
        title='No reservation found'
        subtitle='Looks like you have not reservation on your property'
      />
      // </ClientOnly>
    );
  }

  return (
    // <ClientOnly>
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
    // {/* </ClientOnly> */}
  );
};

export default ReservationsPage;
