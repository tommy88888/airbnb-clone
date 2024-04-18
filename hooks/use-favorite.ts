import { SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import useModal from './use-auth-modal';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type UseFavoriteProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};

const useFavorite = ({ listingId, currentUser }: UseFavoriteProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  // const [hasFavorited, setHasFavorited] = useState(false);

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  // useEffect(() => {
  //   const list = currentUser?.favoriteIds || [];
  //   setHasFavorited(list.includes(listingId));
  // }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return onOpen('register');

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success('Success');
      } catch (err) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, hasFavorited, listingId, onOpen, router]
  );

  return { hasFavorited, toggleFavorite };
};
export default useFavorite;
