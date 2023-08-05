import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthStore, authStoreSlice } from "./auth-store/auth.store";
import { PartStore, partStoreSlice } from "./part-store/part.store";
import { KeyboardStore, keyboardStoreSlice } from "./keyboard-store/keyboard.store";

export type Store = AuthStore & PartStore & KeyboardStore;
export const useApplicationStore = create<Store>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a),
            ...partStoreSlice(...a),
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
