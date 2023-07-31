export enum SwitchType {
    CLICKY = "CLICKY",
    TACTILE = "TACTILE",
    LINEAR = "LINEAR",
}

export enum PinType {
    PIN3 = "PIN3",
    PIN5 = "PIN5",
}

export enum PriceWeight {
    LIGHT = "LIGHT",
    MEDIUM = "MEDIUM",
    HEAVY = "HEAVY",
}

export enum CableConnector {
    USB_C = "USB_C",
    USB = "USB",
}

export enum PartType {
    CABLE = "CABLE",
    KEYCAP = "KEYCAP",
    KEYCAP_SET = "KEYCAP_SET",
    PCB = "PCB",
    PLATE = "PLATE",
    STABILIZER = "STABILIZER",
    SWITCH_SET = "SWITCH_SET",
    CASE = "CASE",
}

export enum KeycapMaterial {
    ABS = "ABS",
    PBT = "PBT",
    DOUBLESHOT_PBT = "DOUBLESHOT_PBT",
    DOUBLESHOT_ABS = "DOUBLESHOT_ABS",
}

export enum StabilizerType {
    CLAMPED = "CLAMPED",
    SCREW_IN = "SCREW_IN",
}

export enum PCBType {
    HOT_SWAP = "HOT_SWAP",
    STANDARD = "STANDARD",
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
    UNSORTED = "UNSORTED",
}

export enum ProcurementState {
    REALIZED = "REALIZED",
    PENDING = "PENDING",
    CANCELED = "CANCELED",
    NONE = "NONE",
}
