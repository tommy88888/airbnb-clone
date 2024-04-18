'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../avatar';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import MenuItem from './menu-item';

import { signOut, useSession } from 'next-auth/react';
import { SafeUser } from '@/types';
import useModal from '@/hooks/use-auth-modal';
import { useClickOutside } from '@/hooks/use-click-outside';
import useRentModal from '@/hooks/use-rent-modal';
import rentModal from '../modals/rent-modal';
import { useRouter } from 'next/navigation';
// import rentModal from '../modals/rent-modal';

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { toggle, isOpen, isToggle, onOpen, onClose, modalType } = useModal();
  const rentModal = useRentModal();

  const ref = useClickOutside(() => {
    if (isToggle) {
      toggle();
    }
  });

  const onRent = useCallback(() => {
    if (!currentUser) {
      return onOpen('login');
    }
    rentModal.onOpen();
  }, [currentUser, rentModal, onOpen]);

  return (
    <div className='relative ' ref={ref}>
      <div className='flex flex-row items-center gap-3 '>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer '
        >
          Airbnb your home
        </div>
        <div
          onClick={() => toggle()}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition '
        >
          <AiOutlineMenu />
          <div className='hidden md:block '>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isToggle && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm  '>
          <div className='flex flex-col cursor-pointer '>
            {currentUser || status === 'authenticated' ? (
              <>
                {/* <MenuItem label='test' onClick={() => router.push('/test')} /> */}
                <MenuItem
                  label='My trips'
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label='My favorites'
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label='My reservations'
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label='My properties'
                  onClick={() => router.push('/properties')}
                />
                <MenuItem label='Airbnb my home' onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label='Logout' onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label='Login' onClick={() => onOpen('login')} />
                <MenuItem label='Sign up' onClick={() => onOpen('register')} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
