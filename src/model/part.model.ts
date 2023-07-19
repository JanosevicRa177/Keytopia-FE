import { StabilizerType } from "./../utils/enum";
import {
	CableConnector,
	KeycapMaterial,
	PCBType,
	PinType,
	PriceWeight,
} from "../utils/enum";
import { VariableWithValue } from "../utils/types";

export type CablePart = {
	material: string;
	color: string;
	length: string;
	keyboardConnector: CableConnector;
	computerConnector: CableConnector;
	isCoiled: boolean;
	isQuickRelease: boolean;
	image?: File;
};

export type CasePart = {
	material: string;
	color: string;
	size: string;
	image?: File;
};

export type KeycapPart = {
	material: KeycapMaterial;
	keycapProfile: string;
	image?: File;
};

export type KeycapSetPart = {
	keycapQuantity: number;
	material: KeycapMaterial;
	keycapProfile: string;
	language: string;
	layouts: string[];
	image?: File;
};

export type PCBPart = {
	type: PCBType;
	btConnect: boolean;
	size: string;
	color: string;
	pinType: PinType;
	stabilizerType: StabilizerType;
	image?: File;
};

export type PlatePart = {
	material: string;
	color: string;
	size: string;
	image?: File;
};

export type StabilizersPart = {
	type: StabilizerType;
	image?: File;
};

export type SwitchSetPart = {
	switchName: string;
	switchQuantity: number;
	image?: File;
};

export type Part = {
	name: string;
	price: number;
	priceWeight: PriceWeight;
	brand?: string;
	supplier?: string;
	quantity?: number;
	imageUrl?: string;
};

export type Cable = Part & CablePart;
export type Case = Part & CasePart;
export type Keycap = Part & KeycapPart;
export type KeycapSet = Part & KeycapSetPart;
export type PCB = Part & PCBPart;
export type Plate = Part & PlatePart;
export type Stabilizers = Part & StabilizersPart;
export type SwitchSet = Part & SwitchSetPart;

export type PartWithData = {
	name: string;
	variables: VariableWithValue[];
	imageUrl: string;
};
