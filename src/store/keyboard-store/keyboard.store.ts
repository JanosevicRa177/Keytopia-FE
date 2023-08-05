import { StateCreator } from "zustand";
import { Store } from "../store";
import { produce } from "immer";
import { PriceWeight, SwitchType } from "../../utils/enum";
import { MakeKeyboard } from "./types/keyboard.type";

export type KeyboardStoreState = {
    keyboard: MakeKeyboard;
    sizeName: string;
    switchType: SwitchType;
    priceWeight: PriceWeight;
};

export type KeyboardActions = {
    setName: (name: string) => void;
    setSizeName: (sizeName: string) => void;
    setSwitchType: (switchType: SwitchType) => void;
    setPriceWeight: (priceWeight: PriceWeight) => void;
};

export const state: KeyboardStoreState = {
    keyboard: {},
    sizeName: "",
    switchType: SwitchType.TACTILE,
    priceWeight: PriceWeight.MEDIUM
};

export type KeyboardStore = KeyboardStoreState & KeyboardActions;

export const keyboardStoreSlice: StateCreator<Store, [], [], KeyboardStore> = (set) => ({
    ...state,
    setName: (name: string) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.keyboard.name = name;
                return state;
            })
        );
    },
    setSizeName: (sizeName: string) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.sizeName = sizeName;
                state.keyboard.case = undefined;
                state.keyboard.plate = undefined;
                state.keyboard.pcb = undefined;
                return state;
            })
        );
    },
    setSwitchType: (switchType: SwitchType) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.switchType = switchType;
                state.keyboard.switchSet = undefined;
                return state;
            })
        );
    },
    setPriceWeight: (priceWeight: PriceWeight) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.keyboard = {};
                state.priceWeight = priceWeight
                return state;
            })
        );
    },
});