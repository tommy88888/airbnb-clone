'use client';

import Container from '@/components/container';
import Heading from '@/components/heading';
import ListingCard from '@/components/listings/listing-card';
import { SafeReservation, SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

type ReservationsClientProps = {
  reservations: SafeReservation[];
  currentUser?: SafeUser;
};

const ReservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
  const [deletingId, setDeletingId] = useState('');
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setDeletingId(''));
    },
    [router]
  );
  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reserve) => (
          <ListingCard
            key={reserve.id}
            data={reserve.listing}
            reservation={reserve}
            actionId={reserve.id}
            onAction={onCancel}
            disabled={deletingId === reserve.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
