import * as yup from "yup";
import { PinType, PriceWight, SwitchType } from "./enum";

export const KEYCAP_PROFILE_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
});

export const KEYCAP_PROFILE_DEFAULT_VALUES = {
	name: "",
};

export const LAYOUT_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	localization: yup.string().required(),
});

export const LAYOUT_DEFAULT_VALUES = {
	name: "",
	localization: "",
};

export const SIZE_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	neededNumberOfKeys: yup.number().min(1).required(),
});

export const SIZE_DEFAULT_VALUES = {
	name: "",
	neededNumberOfKeys: 0,
};

export const SWTICH_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	actuationForce: yup.number().required(),
	actuationPoint: yup.number().required(),
	switchType: yup
		.mixed<SwitchType>()
		.oneOf(Object.values(SwitchType))
		.required(),
	pinType: yup.mixed<PinType>().oneOf(Object.values(PinType)).required(),
	priceWeight: yup
		.mixed<PriceWight>()
		.oneOf(Object.values(PriceWight))
		.required(),
});

export const SWTICH_DEFAULT_VALUES = {
	name: "",
	actuationForce: 0,
	actuationPoint: 0,
	switchType: SwitchType.TACTILE,
	pinType: PinType.PIN5,
	priceWeight: PriceWight.LIGHT,
};
