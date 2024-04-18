import { create } from 'zustand';
import { db } from '@/lib/db';
import getCurrentUser from '@/actions/get-current-user';
import { SafeReservation } from '@/types';

// interface Reservation {
//   id: string;
//   // ... other reservation properties
//   createdAt: Date;
//   startDate: Date;
//   endDate: Date;
//   listing: Listing; // Replace with your listing type
// }

// interface Listing {
//   id: string;
//   // ... other listing properties
//   createdAt: Date;
// }

interface ReservationsState {
  reservations: SafeReservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationsState = {
  reservations: [],
  loading: false,
  error: null,
};

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const useReservationsStore = create((set) => ({
  ...initialState,
  fetchReservations: async (params: IParams) => {
    set({ loading: true, error: null });
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) throw new Error('Unauthorized');
      const { listingId, userId, authorId } = params;
      let query: any = {};

      if (listingId) {
        query.listingId = listingId;
      }

      if (userId) {
        query.userId = userId;
      }

      if (authorId) {
        query.listing = { userId: authorId };
      }

      const reservations = await db.reservation.findMany({
        where: {
          AND: [query, { userId: currentUser.id }],
        },
        include: {
          listing: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const safeReservations = reservations.map((reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      }));
      set({ reservations: safeReservations, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },
}));
