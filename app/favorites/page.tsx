import getCurrentUser from '@/actions/get-current-user';
import getFavoriteListings from '@/actions/get-favorite-listings';
import EmptyState from '@/components/empty-state';
import ClientOnly from '@/lib/client-only';
import FavoritesClient from './Favorites-client';

type FavoritesPageProps = {};

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subtitle='looks like you do not have any favorites place'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
