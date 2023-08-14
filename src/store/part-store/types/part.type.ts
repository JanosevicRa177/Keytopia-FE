export type PartStoreItem = {
    name: string;
    image: string;
    quantity: number;
    price: number;
    isKeyboard: boolean;
};

export type PartItem = {
    name: string;
    quantity: number;
    isKeyboard: boolean;
};

export type Procurement = {
    parts: PartItem[];
};
