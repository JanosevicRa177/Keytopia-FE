import { StateCreator } from "zustand";
import { Store } from "../store";
import { produce } from "immer";
import { PriceWeight, SwitchType } from "../../utils/enum";
import { MakeKeyboard, PartDataWithSize } from "./types/keyboard.type";

export type KeyboardStoreState = {
    keyboard: MakeKeyboard;
    sizeName: string;
    switchType: SwitchType;
    priceWeight: PriceWeight;
    color: string;
};

export type KeyboardActions = {
    setName: (name: string) => void;
    setSizeName: (sizeName: string) => void;
    setColor: (color: string) => void;
    setSwitchType: (switchType: SwitchType) => void;
    setPriceWeight: (priceWeight: PriceWeight) => void;
    setCase: (aCase: PartDataWithSize) => void;
};

export const state: KeyboardStoreState = {
    keyboard: {},
    sizeName: "",
    switchType: SwitchType.TACTILE,
    priceWeight: PriceWeight.MEDIUM,
    color: ""
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
    setCase: (aCase: PartDataWithSize) => {
        set(
            produce((state: KeyboardStoreState) => {
                if (aCase.name === state.keyboard.case?.name)
                    state.keyboard.case = undefined;
                else state.keyboard.case = aCase;
                return state;
            })
        );
    },
    setColor: (color: string) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.color = color;
                state.keyboard = {};
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