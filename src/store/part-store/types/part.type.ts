export type PartStoreItem = {
	name: string;
	image: string;
	quantity: number;
	price: number;
};

export type PartItem = {
	name: string;
	quantity: number;
};

export type Procurement = {
	parts: PartItem[];
};
