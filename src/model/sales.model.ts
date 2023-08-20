import { PartData } from "../store/keyboard-store/types/keyboard.type";

export type DeliveryService = {
    name: string;
    phone: string;
};

export type Order = {
    id: string;
    buyerEmail?: string;
    date: Date;
    deadline: Date;
    products: Product[]
};

export type Product = {
    id: string;
    part: PartData;
}