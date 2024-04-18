import { db } from '@/lib/db';

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (locationValue) query.locationValue = locationValue;
    if (startDate && endDate)
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };

    const listings = await db.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });
    // return listings;

    // if get warning on terminal which said " only plain objects can be passed to client components from server components. Date object are not supported"

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
}
