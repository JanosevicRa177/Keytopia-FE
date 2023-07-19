import * as yup from "yup";
import {
	CableConnector,
	KeycapMaterial,
	PCBType,
	PinType,
	PriceWeight,
	StabilizerSize,
	StabilizerType,
} from "../enum";

export const CABLE_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	price: yup.number().min(1).required(),
	priceWeight: yup
		.mixed<PriceWeight>()
		.oneOf(Object.values(PriceWeight))
		.required(),
	brand: yup.string().required(),
	material: yup.string().required(),
	color: yup.string().required(),
	length: yup.string().required(),
	keyboardConnector: yup
		.mixed<CableConnector>()
		.oneOf(Object.values(CableConnector))
		.required(),
	computerConnector: yup
		.mixed<CableConnector>()
		.oneOf(Object.values(CableConnector))
		.required(),
	isCoiled: yup.boolean().required(),
	isQuickRelease: yup.boolean().required(),
});

export const CABLE_DEFAULT_VALUES = {
	name: "",
	price: 0,
	priceWeight: PriceWeight.LIGHT,
	material: "",
	color: "",
	length: "",
	keyboardConnector: CableConnector.USB,
	computerConnector: CableConnector.USB,
	isCoiled: false,
	isQuickRelease: false,
};

export const CASE_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	price: yup.number().min(1).required(),
	priceWeight: yup
		.mixed<PriceWeight>()
		.oneOf(Object.values(PriceWeight))
		.required(),
	brand: yup.string().required(),
	material: yup.string().required(),
	color: yup.string().required(),
	size: yup.string().required(),
});

export const CASE_DEFAULT_VALUES = {
	name: "",
	price: 0,
	priceWeight: PriceWeight.LIGHT,
	material: "",
	color: "",
};

export const KEYCAP_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	price: yup.number().min(1).required(),
	priceWeight: yup
		.mixed<PriceWeight>()
		.oneOf(Object.values(PriceWeight))
		.required(),
	brand: yup.string().required(),
	material: yup
		.mixed<KeycapMaterial>()
		.oneOf(Object.values(KeycapMaterial))
		.required(),
	keycapProfile: yup.string().required(),
});

export const KEYCAP_DEFAULT_VALUES = {
	name: "",
	price: 0,
	priceWeight: PriceWeight.LIGHT,
	material: KeycapMaterial.ABS,
};

export const KEYCAP_SET_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	price: yup.number().min(1).required(),
	priceWeight: yup
		.mixed<PriceWeight>()
		.oneOf(Object.values(PriceWeight))
		.required(),
	brand: yup.string().required(),
	keycapQuantity: yup.number().min(1).required(),
	material: yup
		.mixed<KeycapMaterial>()
		.oneOf(Object.values(KeycapMaterial))
		.required(),
	keycapProfile: yup.string().required(),
	language: yup.string().required(),
	layouts: yup.array().min(1).required(),
});

export const KEYCAP_SET_DEFAULT_VALUES = {
	name: "",
	price: 0,
	priceWeight: PriceWeight.LIGHT,
	keycapQuantity: 0,
	material: KeycapMaterial.ABS,
	keycapProfile: "",
	language: "",
	layouts: [],
};

export const PCB_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	price: yup.number().min(1).required(),
	priceWeight: yup
		.mixed<PriceWeight>()
		.oneOf(Object.values(PriceWeight))
		.required(),
	brand: yup.string().required(),
	type: yup.mixed<PCBType>().oneOf(Object.values(PCBType)).required(),
	btConnect: yup.boolean().required(),
	size: yup.string().required(),
	color: yup.string().required(),
	pinType: yup.mixed<PinType>().oneOf(Object.values(PinType)).required(),
	stabilizerType: yup
		.mixed<StabilizerType>()
		.oneOf(Object.values(StabilizerType))
		.required(),
});

export const PCB_DEFAULT_VALUES = {
	name: "",
	price: 0,
	priceWeight: PriceWeight.LIGHT,
	type: PCBType.HOT_SWAP,
	btConnect: false,
	color: "",
	pinType: PinType.PIN5,
	stabilizerType: StabilizerType.CLAMPED,
};

export const PLATE_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	price: yup.number().min(1).required(),
	priceWeight: yup
		.mixed<PriceWeight>()
		.oneOf(Object.values(PriceWeight))
		.required(),
	brand: yup.string().required(),
	material: yup.string().required(),
	color: yup.string().required(),
	size: yup.string().required(),
});

export const PLATE_DEFAULT_VALUES = {
	name: "",
	price: 0,
	priceWeight: PriceWeight.LIGHT,
	material: "",
	color: "",
};

export const STABILIZER_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	price: yup.number().min(1).required(),
	priceWeight: yup
		.mixed<PriceWeight>()
		.oneOf(Object.values(PriceWeight))
		.required(),
	brand: yup.string().required(),
	type: yup
		.mixed<StabilizerType>()
		.oneOf(Object.values(StabilizerType))
		.required(),
	size: yup
		.mixed<StabilizerSize>()
		.oneOf(Object.values(StabilizerSize))
		.required(),
});

export const STABILIZER_DEFAULT_VALUES = {
	name: "",
	price: 0,
	priceWeight: PriceWeight.LIGHT,
	type: StabilizerType.CLAMPED,
	size: StabilizerSize.U6_25,
};

export const SWITCH_SET_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	price: yup.number().min(1).required(),
	priceWeight: yup
		.mixed<PriceWeight>()
		.oneOf(Object.values(PriceWeight))
		.required(),
	brand: yup.string().required(),
	switchName: yup.string().required(),
	switchQuantity: yup.number().min(1).required(),
});

export const SWITCH_SET_DEFAULT_VALUES = {
	name: "",
	price: 0,
	priceWeight: PriceWeight.LIGHT,
	switchQuantity: 0,
};
