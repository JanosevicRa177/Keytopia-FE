import { PartType, StabilizerType, PinType } from "../../../utils/enum";

export type MakeKeyboard = {
    name?: string;
    pcb?: PcbData;
    plate?: PartDataWithSize;
    stabilizers?: PartDataWithStabilizerType;
    case?: PartDataWithSize;
    cable?: PartData;
    switchSet?: PartWithPinType;
    keycapSet?: PartData;
};

export type PartData = {
    name: string;
    imageUrl: string;
    partType: PartType;
    price: number;
};


export type PartDataWithSize = PartData & { sizeName: string }

export type PartDataWithStabilizerType = PartData & { stabilizerType: StabilizerType; }

export type PcbData = PartData & { stabilizerType: StabilizerType; sizeName: string; pinType: PinType; btConnect: boolean; }

export type PartWithPinType = PartData & { pinType: PinType }