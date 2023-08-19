export type PartStoreItem = {
    name: string;
    image: string | null;
    quantity: number;
    price: number;
    generatedByBuyer?: boolean;
};

export type PartItem = {
    name: string;
    quantity: number;
};

export type Procurement = {
    parts: PartItem[];
};

export type Order = {
    parts: PartItem[];
    deliveryServiceName: string;
};
