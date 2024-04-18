// 'use client';
// import { SafeListing } from '@/types';
// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// export const useListingStore = create(
//   persist(
//     (set: any, get: any) => ({
//       listing: 0,
//       setListing: (newList: SafeListing) => set({ listing: newList }),
//     }),
//     {
//       name: 'listing', // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//       skipHydration: true,
//     }
//   )
// );
