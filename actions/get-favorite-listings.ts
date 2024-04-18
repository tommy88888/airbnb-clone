import { db } from '@/lib/db';
import getCurrentUser from './get-current-user';

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (err: any) {
    throw new Error(err);
  }
}
