import { Address } from "../../../model/util.model";

export type Register = {
	name: string;
	surname: string;
	email: string;
	address: Address;
	phone: string;
	password: string;
	confirmPassword: string;
};
