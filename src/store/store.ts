import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AuthStore, authStoreSlice } from './auth-store/auth.store';

export type Store = AuthStore;
export const useApplicationStore = create<Store>()(
  persist(
    immer((...a) => ({
      ...authStoreSlice(...a),
    })),
    {
      partialize: ({ token, user,formState }) => ({
        token,
        user,
        formState
      }),
      name: 'application-store',
    }
  )
);
