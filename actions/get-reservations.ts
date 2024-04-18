import { db } from '@/lib/db';
import getCurrentUser from './get-current-user';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
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
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('🚀 ~ getReservations ~ query:', query);
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
    return safeReservations;
  } catch (err: any) {
    throw new Error(err);
  }
}
