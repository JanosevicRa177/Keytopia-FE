import { StateCreator } from "zustand";
import { Order, PartItem, PartStoreItem, Procurement } from "./types/part.type";
import { Store } from "../store";
import { produce } from "immer";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type CartStoreState = {
    procurementParts: PartStoreItem[];
    completePrice: number;
};

export type CartActions = {
    addToCart: (part: PartStoreItem) => Promise<void>;
    removeFromCart: (partName: string) => Promise<void>;
    setQuantityToPartCart: (partName: string, number: number) => Promise<void>;
    increaseQuantityToPartCart: (partName: string) => Promise<void>;
    decreaseQuantityToPartCart: (partName: string) => Promise<void>;
    makeProcurement: () => Promise<boolean>;
    makeOrder: (deliveryService: string) => Promise<boolean>;
    emptyCart: () => Promise<void>;
    setCompletePrice: () => void;
};

export const state: CartStoreState = {
    procurementParts: [],
    completePrice: 0
};

export type CartStore = CartStoreState & CartActions;

export const cartStoreSlice: StateCreator<Store, [], [], CartStore> = (set, get) => ({
    ...state,
    addToCart: async (part: PartStoreItem) => {
        const index = get().procurementParts.findIndex((partItem: PartStoreItem) => partItem.name === part.name);
        if (index !== -1) {
            get().increaseQuantityToPartCart(part.name);
            return;
        }
        set(
            produce((state: CartStoreState) => {
                state.procurementParts.push(part);
                return state;
            })
        );
        get().setCompletePrice();
    },
    removeFromCart: async (partName: string) => {
        set(
            produce((state: CartStoreState) => {
                const result = state.procurementParts.filter((part: PartStoreItem) => {
                    return part.name !== partName;
                });
                state.procurementParts = result;
                return state;
            })
        );
        get().setCompletePrice();
    },
    emptyCart: async () => {
        set(
            produce((state: CartStoreState) => {
                state.procurementParts = [];
                return state;
            })
        );
        get().setCompletePrice();
    },
    setCompletePrice: (): void => {
        let price = 0;
        get().procurementParts.forEach(part => { price += part.price * part.quantity })
        set(
            produce((state: CartStoreState) => {
                state.completePrice = Math.round(price * 100) / 100;
                return state;
            })
        );
    },
    setQuantityToPartCart: async (partName: string, number: number) => {
        const index = get().procurementParts.findIndex((partItem: PartStoreItem) => partItem.name === partName);
        set(
            produce((state: CartStoreState) => {
                state.procurementParts[index].quantity = number;
                return state;
            })
        );
        get().setCompletePrice();
    },
    increaseQuantityToPartCart: async (partName: string) => {
        const index = get().procurementParts.findIndex((partItem: PartStoreItem) => partItem.name === partName);
        set(
            produce((state: CartStoreState) => {
                state.procurementParts[index].quantity++;
                return state;
            })
        );
        get().setCompletePrice();
    },
    decreaseQuantityToPartCart: async (partName: string) => {
        const index = get().procurementParts.findIndex((partItem: PartStoreItem) => partItem.name === partName);
        if (get().procurementParts[index].quantity === 1) return;
        set(
            produce((state: CartStoreState) => {
                state.procurementParts[index].quantity--;
                return state;
            })
        );
        get().setCompletePrice();
    },
    makeProcurement: async () => {
        if (get().procurementParts.length === 0) {
            toast.error("Procurement empty! Add some items.");
            return false;
        }
        let partItems: PartItem[] = [];
        get().procurementParts.forEach((part: PartStoreItem) =>
            partItems.push({ name: part.name, quantity: part.quantity })
        );
        set(
            produce((state: CartStoreState) => {
                state.procurementParts = [];
                return state;
            })
        );
        const procurement: Procurement = { parts: partItems };
        try {
            await axios.post(`${BASE_URL}/procurement`, procurement, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + get().token,
                },
            });
            toast.success("Procurements created!");
        } catch (e: any) {
            toast.error(e.response.data.message);
            return false;
        }
        return true;
    },
    makeOrder: async (deliveryService: string) => {
        if (get().procurementParts.length === 0) {
            toast.error("Order empty! Add some items.");
            return false;
        }
        let partItems: PartItem[] = [];
        get().procurementParts.forEach((part: PartStoreItem) =>
            partItems.push({ name: part.name, quantity: part.quantity })
        );
        const order: Order = { parts: partItems, deliveryServiceName: deliveryService };
        try {
            await axios.post(`${BASE_URL}/order`, order, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + get().token,
                },
            });
            toast.success("Order created!");
            set(
                produce((state: CartStoreState) => {
                    state.procurementParts = [];
                    state.completePrice = 0;
                    return state;
                })
            );
        } catch (e: any) {
            toast.error(e.response.data.message);
            return false;
        }
        return true;
    },
});
