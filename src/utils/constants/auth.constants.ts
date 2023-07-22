import * as yup from "yup";

export const LOGIN_VALIDATION_SCHEMA = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required(),
});

export const LOGIN_DEFAULT_VALUES = {
	email: "",
	password: "",
};

export const REGISTER_BUYER_VALIDATION_SCHEMA = yup.object({
	email: yup.string().required().email(),
	password: yup
		.string()
		.required()
		.min(9)
		.matches(
			/^[0-9a-zA-Z!?]{9}[0-9a-zA-Z!?]*/,
			"Password must be at least 9 characters long"
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required(),
	name: yup.string().required(),
	surname: yup.string().required(),
	phone: yup.string().required(),
	address: yup.object().shape({
		street: yup.string().required(),
		streetNumber: yup.string().required(),
		city: yup.string().required(),
		zipCode: yup.string().required(),
		country: yup.string().required(),
	}),
});

export const REGISTER_BUYER_DEFAULT_VALUES = {
	name: "",
	surname: "",
	email: "",
	phone: "",
	address: {
		street: "",
		streetNumber: "",
		city: "",
		zipCode: "",
		country: "",
	},
	password: "",
	confirmPassword: "",
};

export const REGISTER_ADMIN_VALIDATION_SCHEMA = yup.object({
	email: yup.string().required().email(),
	name: yup.string().required(),
	surname: yup.string().required(),
	phone: yup.string().required(),
	address: yup.object().shape({
		street: yup.string().required(),
		streetNumber: yup.string().required(),
		city: yup.string().required(),
		zipCode: yup.string().required(),
		country: yup.string().required(),
	}),
});

export const REGISTER_ADMIN_DEFAULT_VALUES = {
	name: "",
	surname: "",
	email: "",
	phone: "",
	address: {
		street: "",
		streetNumber: "",
		city: "",
		zipCode: "",
		country: "",
	},
};

export const CHANGE_PASSWORD_VALIDATION_SCHEMA = yup.object({
	oldPassword: yup
		.string()
		.required()
		.min(9)
		.matches(
			/^[0-9a-zA-Z!?]{9}[0-9a-zA-Z!?]*/,
			"Password must be at least 9 characters long"
		),
	newPassword: yup
		.string()
		.required()
		.min(9)
		.matches(
			/^[0-9a-zA-Z!?]{9}[0-9a-zA-Z!?]*/,
			"Password must be at least 9 characters long"
		),
	confirmPassword: yup
		.string()
		.required()
		.min(9)
		.matches(
			/^[0-9a-zA-Z!?]{9}[0-9a-zA-Z!?]*/,
			"Password must be at least 9 characters long"
		),
});

export const CHANGE_PASSWORD_DEFAULT_VALUES = {
	oldPassword: "",
	newPassword: "",
	confirmPassword: "",
};

export const UPDATE_ACCOUNT_VALIDATION_SCHEMA = yup.object({
	password: yup
		.string()
		.required()
		.min(9)
		.matches(
			/^[0-9a-zA-Z!?]{9}[0-9a-zA-Z!?]*/,
			"Password must be at least 9 characters long"
		),
	name: yup.string().required(),
	surname: yup.string().required(),
	phone: yup.string().required(),
	address: yup.object().shape({
		street: yup.string().required(),
		streetNumber: yup.string().required(),
		city: yup.string().required(),
		zipCode: yup.string().required(),
		country: yup.string().required(),
	}),
});

export const UPDATE_ACCOUNT_DEFAULT_VALUES = {
	name: "",
	surname: "",
	phone: "",
	address: {
		street: "",
		streetNumber: "",
		city: "",
		zipCode: "",
		country: "",
	},
	password: "",
};
