import * as yup from "yup";
import { CableConnector, PriceWeight } from "../enum";

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
	price: 1,
	priceWeight: PriceWeight.LIGHT,
	material: "",
	color: "",
	length: "",
	keyboardConnector: CableConnector.USB,
	computerConnector: CableConnector.USB,
	isCoiled: false,
	isQuickRelease: false,
};
