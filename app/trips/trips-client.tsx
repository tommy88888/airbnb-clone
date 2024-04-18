'use client';

import Container from '@/components/container';
import Heading from '@/components/heading';
import ListingCard from '@/components/listings/listing-card';
import { SafeReservation, SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

type TripsClientProps = {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
};

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          router.refresh();
          toast.success('Success cancelled reservation');
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(''));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );
  return (
    <Container>
      <Heading
        title='Trips'
        subtitle='Where you have been and where you are going?'
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
        {reservations.map((reserve) => (
          <ListingCard
            key={reserve.id}
            data={reserve.listing}
            reservation={reserve}
            actionId={reserve.id}
            onAction={onCancel}
            disabled={deletingId === reserve.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
