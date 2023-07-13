import { Address } from "./util.model";

export type Brand = {
	name: string;
	slogan: string;
};

export type Supplier = {
	name: string;
	phone: string;
	address: Address;
};
