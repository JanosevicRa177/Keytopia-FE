import * as yup from "yup";

export const SUPPLIER_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	phone: yup.string().required(),
	address: yup.object().shape({
		street: yup.string().required(),
		streetNumber: yup.string().required(),
		city: yup.string().required(),
		zipCode: yup.string().required(),
		country: yup.string().required(),
	}),
	brands: yup.array().min(1).required(),
});

export const SUPPLIER_DEFAULT_VALUES = {
	name: "",
	phone: "",
	address: {
		street: "",
		streetNumber: "",
		city: "",
		zipCode: "",
		country: "",
	},
	brands: [],
};

export const BRAND_VALIDATION_SCHEMA = yup.object({
	name: yup.string().required(),
	slogan: yup.string().required(),
});

export const BRAND_DEFAULT_VALUES = {
	name: "",
	slogan: "",
};
