import { StateCreator } from "zustand";
import { Store } from "../store";
import { produce } from "immer";
import { PriceWeight, SwitchType } from "../../utils/enum";
import { MakeKeyboard, PartData, PartDataWithSize, PartDataWithStabilizerType, PartPcbData, PartWithPinType } from "./types/keyboard.type";

export type KeyboardStoreState = {
    keyboard: MakeKeyboard;
    sizeName: string;
    switchType: SwitchType;
    priceWeight: PriceWeight;
    color: string;
    lubeSwitches: boolean;
    assembleKeyboard: boolean;
};

export type KeyboardActions = {
    setName: (name: string) => void;
    setSizeName: (sizeName: string) => void;
    setColor: (color: string) => void;
    setSwitchType: (switchType: SwitchType) => void;
    setPriceWeight: (priceWeight: PriceWeight) => void;
    setCase: (aCase: PartDataWithSize) => void;
    setPCB: (pcb: PartPcbData) => void;
    setPlate: (plate: PartDataWithSize) => void;
    setCable: (cable: PartData) => void;
    setStabilizers: (stabilizers: PartDataWithStabilizerType) => void;
    setKeycapSet: (keycapSet: PartData) => void;
    setSwitchSet: (switchSet: PartWithPinType) => void;
    setAssembleKeyboard: (assembleKeyboard: boolean) => void;
    setLubeSwithces: (lubeSwitches: boolean) => void;
    setImage: (image: File | undefined) => void;
};

export const state: KeyboardStoreState = {
    keyboard: {},
    sizeName: "",
    switchType: SwitchType.TACTILE,
    priceWeight: PriceWeight.MEDIUM,
    color: "",
    lubeSwitches: false,
    assembleKeyboard: false
};

export type KeyboardStore = KeyboardStoreState & KeyboardActions;

export const keyboardStoreSlice: StateCreator<Store, [], [], KeyboardStore> = (set) => ({
    ...state,
    setAssembleKeyboard: (assembleKeyboard: boolean) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.assembleKeyboard = assembleKeyboard;
                return state;
            })
        );
    },
    setLubeSwithces: (lubeSwitches: boolean) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.lubeSwitches = lubeSwitches;
                return state;
            })
        );
    },
    setStabilizers: (stabilizers: PartDataWithStabilizerType) => {
        set(
            produce((state: KeyboardStoreState) => {
                if (stabilizers.name === state.keyboard.stabilizers?.name)
                    state.keyboard.stabilizers = undefined;
                else state.keyboard.stabilizers = stabilizers;
                return state;
            })
        );
    },
    setSwitchSet: (switchSet: PartWithPinType) => {
        set(
            produce((state: KeyboardStoreState) => {
                if (switchSet.name === state.keyboard.switchSet?.name)
                    state.keyboard.switchSet = undefined;
                else state.keyboard.switchSet = switchSet;
                return state;
            })
        );
    },
    setKeycapSet: (keycapSet: PartData) => {
        set(
            produce((state: KeyboardStoreState) => {
                if (keycapSet.name === state.keyboard.keycapSet?.name)
                    state.keyboard.keycapSet = undefined;
                else state.keyboard.keycapSet = keycapSet;
                return state;
            })
        );
    },
    setCable: (cable: PartData) => {
        set(
            produce((state: KeyboardStoreState) => {
                if (cable.name === state.keyboard.cable?.name)
                    state.keyboard.cable = undefined;
                else state.keyboard.cable = cable;
                return state;
            })
        );
    },
    setPlate: (plate: PartDataWithSize) => {
        set(
            produce((state: KeyboardStoreState) => {
                if (plate.name === state.keyboard.plate?.name)
                    state.keyboard.plate = undefined;
                else state.keyboard.plate = plate;
                return state;
            })
        );
    },
    setPCB: (pcb: PartPcbData) => {
        set(
            produce((state: KeyboardStoreState) => {
                if (pcb.name === state.keyboard.pcb?.name)
                    state.keyboard.pcb = undefined;
                else state.keyboard.pcb = pcb;
                state.keyboard.switchSet = undefined;
                if (state.keyboard.stabilizers?.stabilizerType !== state.keyboard.pcb?.stabilizerType)
                    state.keyboard.stabilizers = undefined;
                return state;
            })
        );
    },
    setCase: (aCase: PartDataWithSize) => {
        set(
            produce((state: KeyboardStoreState) => {
                if (aCase.name === state.keyboard.caseEntity?.name)
                    state.keyboard.caseEntity = undefined;
                else state.keyboard.caseEntity = aCase;
                return state;
            })
        );
    },
    setName: (name: string) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.keyboard.name = name;
                return state;
            })
        );
    },
    setImage: (image: File | undefined) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.keyboard.image = image;
                return state;
            })
        );
    },
    setSizeName: (sizeName: string) => {
        set(
            produce((state: KeyboardStoreState) => {
                state.sizeName = sizeName;
                state.keyboard.caseEntity = undefined;
                state.keyboard.plate = undefined;
                state.keyboard.pcb = undefined;
                state.keyboard.keycapSet = undefined;
                state.keyboard.switchSet = undefined;
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