import { PinType, PriceWight, SwitchType } from "../utils/enum";

export type KeycapProfile = {
	name: string;
};

export type Size = {
	name: string;
	neededNumberOfKeys: number;
};
export type Layout = {
	name: string;
	localization: string;
};

export type Switch = {
	name: string;
	actuationForce: number;
	actuationPoint: number;
	switchType: SwitchType;
	pinType: PinType;
	priceWeight: PriceWight;
};
