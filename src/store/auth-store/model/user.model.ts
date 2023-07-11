import { Address } from "./address.model";

export type User = {
	id: number;
	name: string;
	surname: string;
	email: string;
	role: string;
	address: Address;
	phone: string;
};
