import { PartType } from "../utils/enum";

export type Address = {
    id?: string;
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;
    country: string;
};

export interface RouteWithPartType {
    value: string
    route: string
    partType?: PartType
}
