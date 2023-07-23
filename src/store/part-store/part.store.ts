import { StateCreator } from "zustand";
import { PartStoreItem } from "./types/part.type";
import { Store } from "../store";
import { produce } from "immer";

export type PartStoreState = {
	procurementParts: PartStoreItem[];
	orderParts: PartStoreItem[];
};

export type PartActions = {
	addToProcurement: (part: PartStoreItem) => Promise<void>;
	removeFromProcurement: (partName: string) => Promise<void>;
	setQuantityToPartProcurement: (
		partName: string,
		number: number
	) => Promise<void>;
	increaseQuantityToPartProcurement: (partName: string) => Promise<void>;
	decreaseQuantityToPartProcurement: (partName: string) => Promise<void>;
	addToOrder: (part: PartStoreItem) => Promise<void>;
	removeFromOrder: (partName: string) => Promise<void>;
};

export const state: PartStoreState = {
	procurementParts: [],
	orderParts: [],
};

export type PartStore = PartStoreState & PartActions;

export const partStoreSlice: StateCreator<Store, [], [], PartStore> = (
	set,
	get
) => ({
	...state,
	addToProcurement: async (part: PartStoreItem) => {
		const index = get().procurementParts.findIndex(
			(partItem) => partItem.name === part.name
		);
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
				const result = state.procurementParts.filter(
					(part: PartStoreItem) => {
						return part.name !== partName;
					}
				);
				state.procurementParts = result;
				return state;
			})
		);
	},
	setQuantityToPartProcurement: async (partName: string, number: number) => {
		const index = get().procurementParts.findIndex(
			(partItem) => partItem.name === partName
		);
		set(
			produce((state: PartStoreState) => {
				state.procurementParts[index].quantity = number;
				return state;
			})
		);
	},
	increaseQuantityToPartProcurement: async (partName: string) => {
		const index = get().procurementParts.findIndex(
			(partItem) => partItem.name === partName
		);
		set(
			produce((state: PartStoreState) => {
				state.procurementParts[index].quantity++;
				return state;
			})
		);
	},
	decreaseQuantityToPartProcurement: async (partName: string) => {
		const index = get().procurementParts.findIndex(
			(partItem) => partItem.name === partName
		);
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
				const result = state.orderParts.filter(
					(part: PartStoreItem) => {
						return part.name !== partName;
					}
				);
				state.orderParts = result;
				return state;
			})
		);
	},
});
