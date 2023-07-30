import { PartItem } from "../store/part-store/types/part.type";
import { ProcurementState } from "../utils/enum";
import { Address } from "./util.model";

export type Brand = {
	name: string;
	slogan: string;
};

export type Supplier = {
	name: string;
	phone: string;
	address: Address;
	brands: string[];
	penals?: number;
};

export type GetProcurementDto = {
	id: number;
	date: Date;
	deadline: Date;
	state: ProcurementState;
	procurementParts: PartItem[];
	supplierName: string;
};
