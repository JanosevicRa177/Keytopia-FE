import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthStore, authStoreSlice } from "./auth-store/auth.store";
import { KeyboardStore, keyboardStoreSlice } from "./keyboard-store/keyboard.store";
import { CartStore, cartStoreSlice } from "./part-store/cart.store";

export type Store = AuthStore & CartStore & KeyboardStore;
export const useApplicationStore = create<Store>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a),
            ...cartStoreSlice(...a),
            ...keyboardStoreSlice(...a),
        })),
        {
            // partialize: ({ token, user, formState }) => ({
            //     token,
            //     user,
            //     formState,
            // }),

            name: "application-store",
        }
    )
);
