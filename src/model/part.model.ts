import { StabilizerType } from "./../utils/enum";
import {
	CableConnector,
	KeycapMaterial,
	PCBType,
	PinType,
	PriceWeight,
} from "../utils/enum";
import { VariableWithValue } from "../utils/types";
import { Switch } from "./part-data.model";

export type CablePart = {
	material: string;
	color: string;
	length: string;
	keyboardConnector: CableConnector;
	computerConnector: CableConnector;
	isCoiled: boolean;
	isQuickRelease: boolean;
};

export type CasePart = {
	material: string;
	color: string;
	size: string;
};

export type KeycapPart = {
	material: KeycapMaterial;
	keycapProfile: string;
};

export type KeycapSetPart = {
	keycapQuantity: number;
	material: KeycapMaterial;
	keycapProfile: string;
	language: string;
	layouts: string[];
};

export type PCBPart = {
	type: PCBType;
	btConnect: boolean;
	size: string;
	color: string;
	pinType: PinType;
	stabilizerType: StabilizerType;
};

export type PlatePart = {
	material: string;
	color: string;
	size: string;
};

export type StabilizersPart = {
	type: StabilizerType;
};

export type SwitchSetPart = {
	switchName: string;
	switchQuantity: number;
};

export type SwitchSetShowMorePart = {
	aSwitch: Switch;
	switchQuantity: number;
};

export type Part = {
	name: string;
	price: number;
	priceWeight: PriceWeight;
	brand?: string;
	supplier?: string;
	quantity?: number;
	imageUrl?: string;
	image?: File;
};

export type Cable = Part & CablePart;
export type Case = Part & CasePart;
export type Keycap = Part & KeycapPart;
export type KeycapSet = Part & KeycapSetPart;
export type PCB = Part & PCBPart;
export type Plate = Part & PlatePart;
export type Stabilizers = Part & StabilizersPart;
export type SwitchSet = Part & SwitchSetPart;
export type SwitchSetShowMore = Part & SwitchSetShowMorePart;

export type PartWithData = {
	name: string;
	variables: VariableWithValue[];
	imageUrl: string;
};
