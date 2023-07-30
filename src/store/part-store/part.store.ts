import { StateCreator } from "zustand";
import { PartItem, PartStoreItem, Procurement } from "./types/part.type";
import { Store } from "../store";
import { produce } from "immer";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type PartStoreState = {
	procurementParts: PartStoreItem[];
	orderParts: PartStoreItem[];
};

export type PartActions = {
	addToProcurement: (part: PartStoreItem) => Promise<void>;
	removeFromProcurement: (partName: string) => Promise<void>;
	setQuantityToPartProcurement: (partName: string, number: number) => Promise<void>;
	increaseQuantityToPartProcurement: (partName: string) => Promise<void>;
	decreaseQuantityToPartProcurement: (partName: string) => Promise<void>;
	addToOrder: (part: PartStoreItem) => Promise<void>;
	removeFromOrder: (partName: string) => Promise<void>;
	makeProcurement: () => Promise<boolean>;
};

export const state: PartStoreState = {
	procurementParts: [],
	orderParts: [],
};

export type PartStore = PartStoreState & PartActions;

export const partStoreSlice: StateCreator<Store, [], [], PartStore> = (set, get) => ({
	...state,
	addToProcurement: async (part: PartStoreItem) => {
		const index = get().procurementParts.findIndex((partItem) => partItem.name === part.name);
		if (index !== -1) {
			get().increaseQuantityToPartProcurement(part.name);
			return;
		}
		set(
			produce((state: PartStoreState) => {
				state.procurementParts.push(part);
				return state;
			})
		);
	},
	removeFromProcurement: async (partName: string) => {
		set(
			produce((state: PartStoreState) => {
				const result = state.procurementParts.filter((part: PartStoreItem) => {
					return part.name !== partName;
				});
				state.procurementParts = result;
				return state;
			})
		);
	},
	setQuantityToPartProcurement: async (partName: string, number: number) => {
		const index = get().procurementParts.findIndex((partItem) => partItem.name === partName);
		set(
			produce((state: PartStoreState) => {
				state.procurementParts[index].quantity = number;
				return state;
			})
		);
	},
	increaseQuantityToPartProcurement: async (partName: string) => {
		const index = get().procurementParts.findIndex((partItem) => partItem.name === partName);
		set(
			produce((state: PartStoreState) => {
				state.procurementParts[index].quantity++;
				return state;
			})
		);
	},
	decreaseQuantityToPartProcurement: async (partName: string) => {
		const index = get().procurementParts.findIndex((partItem) => partItem.name === partName);
		if (get().procurementParts[index].quantity === 1) return;
		set(
			produce((state: PartStoreState) => {
				state.procurementParts[index].quantity--;
				return state;
			})
		);
	},
	addToOrder: async (part: PartStoreItem) => {
		set(
			produce((state: PartStoreState) => {
				state.orderParts.push(part);
				return state;
			})
		);
	},
	removeFromOrder: async (partName: string) => {
		set(
			produce((state: PartStoreState) => {
				const result = state.orderParts.filter((part: PartStoreItem) => {
					return part.name !== partName;
				});
				state.orderParts = result;
				return state;
			})
		);
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
			produce((state: PartStoreState) => {
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
});
