import { PartType, StabilizerType, PinType } from "../../../utils/enum";

export type MakeKeyboard = {
    name?: string;
    pcb?: PartPcbData;
    caseEntity?: PartDataWithSize;
    plate?: PartDataWithSize;
    keycapSet?: PartData;
    cable?: PartData;
    stabilizers?: PartDataWithStabilizerType;
    switchSet?: PartWithPinType;
    image?: File
};

export type MakeKeyboardStrings = {
    name?: string;
    pcb?: string;
    caseEntity?: string;
    plate?: string;
    keycapSet?: string;
    cable?: string;
    stabilizers?: string;
    switchSet?: string;
    image?: File
};

export type PartData = {
    name: string;
    imageUrl: String;
    partType: PartType;
    price: number;
};


export type PartDataWithSize = PartData & { sizeName: string }

export type PartDataWithStabilizerType = PartData & { stabilizerType: StabilizerType; }

export type PartPcbData = PartData & { stabilizerType: StabilizerType; sizeName: string; pinType: PinType; btConnect: boolean; }

export type PartWithPinType = PartData & { pinType: PinType }