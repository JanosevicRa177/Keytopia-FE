import { CableConnector, PriceWeight } from "../utils/enum";
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

export type Part = {
	name: string;
	price: number;
	priceWeight: PriceWeight;
	brand: string;
	quantity?: number;
	imageUrl?: string;
};

export type Cable = Part & CablePart;

export type PartWithData = {
	name: string;
	variables: VariableWithValue[];
	imageUrl: string;
};
