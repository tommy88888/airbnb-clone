'use client';

import { categories } from '@/components/navbar/categories';
import { SafeListing, SafeReservation, SafeUser } from '@/types';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ListingHead from '../../../components/listings/listing-head';
import ListingInfo from '@/components/listings/listing-info';
import useModal from '@/hooks/use-auth-modal';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ListingReservation from '@/components/listings/listing-reservation';
import Container from '@/components/container';
import { Range } from 'react-date-range';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

type ListingClientProps = {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

const ListingClient = ({
  listing,
  currentUser,
  reservations = [],
}: ListingClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const { onOpen } = useModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return onOpen('register');

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    onOpen,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  const category = useMemo(() => {
    return categories.find((cat) => cat.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto '>
        <div className='flex flex-col gap-6 '>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3 '>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
