import { Switch } from "../model/part-data.model";
import { Part, PartWithData } from "../model/part.model";
import { PartType } from "./enum";
import { VariableWithValue } from "./types";

export function normalizeNames(names: string[]): string[] {
    let normalizedNames: string[] = [];
    names.forEach((name) => {
        normalizedNames.push(normalizeString(name));
    });
    return normalizedNames;
}

function normalizeString(str: string): string {
    const words = str.match(/[A-Za-z][a-z]*/g);
    if (!words) return "";

    const firstWord = words[0];
    const lowerCaseWords = words
        .slice(1)
        .map((word) => {
            const lowercasedWord = word.toLowerCase();
            const formattedWord = lowercasedWord.charAt(0).toLowerCase() + lowercasedWord.slice(1);
            return formattedWord;
        })
        .join(" ");
    const capitalizedFirstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    const translatedStr = capitalizedFirstWord + " " + lowerCaseWords;
    return translatedStr;
}

export function normalizeEnum(string: string): string {
    const words = string.toLowerCase().split("_");
    const convertedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return convertedWords.join(" ");
}

export function normalizeDate(inputDate: string): string {
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
}

export function normalizePCBType(
    variable: string,
    data: VariableWithValue[],
    normalizedNames: string[]
) {
    let value = "";
    if (variable === "HOT_SWAP") value = "Hot-swap";
    else value = "Standard";
    data.push({
        variable: normalizedNames[0],
        value: value,
    });
    normalizedNames.shift();
    return;
}

export function normalizeStabilizerType(
    variable: string,
    data: VariableWithValue[],
    normalizedNames: string[]
) {
    let value = "";
    if (variable === "SCREW_IN") value = "Screw-in";
    else value = "Clamped";
    data.push({
        variable: normalizedNames[0],
        value: value,
    });
    normalizedNames.shift();
    return;
}

export function normalizeKeycapMaterial(
    variable: string,
    data: VariableWithValue[],
    normalizedNames: string[]
) {
    let value = "";
    if (variable === "DOUBLESHOT_ABS") value = "Doubleshot ABS";
    else if (variable === "DOUBLESHOT_PBT") value = "Doubleshot PBT";
    else value = variable
    data.push({
        variable: normalizedNames[0],
        value: value,
    });
    normalizedNames.shift();
    return;
}

export function normalizePinType(
    variable: string,
    data: VariableWithValue[],
    normalizedNames: string[]
) {
    let value = "";
    if (variable === "PIN5") value = "5 pin";
    else value = "3 pin";
    data.push({
        variable: normalizedNames[0],
        value: value,
    });
    normalizedNames.shift();
    return;
}

export function normalizeSwitchType(
    variable: string,
    data: VariableWithValue[],
    normalizedNames: string[]
) {
    let value = "";
    if (variable === "CLICKY") value = "Clicky";
    else if (variable === "TACTILE") value = "Tactile";
    else value = "Linear";
    data.push({
        variable: normalizedNames[0],
        value: value,
    });
    normalizedNames.shift();
    return;
}

export function normalizeConnectionType(
    variable: string,
    data: VariableWithValue[],
    normalizedNames: string[]
) {
    let value = "";
    if (variable === "USB") value = "USB";
    else value = "USB-C";
    data.push({
        variable: normalizedNames[0],
        value: value,
    });
    normalizedNames.shift();
    return;
}

export function normalizeKeycapMaterialType(
    variable: string,
    data: VariableWithValue[],
    normalizedNames: string[]
) {
    let value = "";
    if (variable === "DOUBLESHOT_ABS") value = "Doubleshot ABS";
    else if (variable === "DOUBLESHOT_PBT") value = "Doubleshot PBT";
    else value = variable;
    data.push({
        variable: normalizedNames[0],
        value: value,
    });
    normalizedNames.shift();
    return;
}

export function normalizeRoute(string: string): string {
    const words = string.toLowerCase().split(" ");
    const convertedWords = words.map((word) => word.charAt(0).toLowerCase() + word.slice(1));
    return convertedWords.join("-");
}

export function handlePartVariables(part: Part, setData: React.Dispatch<React.SetStateAction<PartWithData>>, partType: PartType) {
    if (part === null) {
        return;
    }
    const variableNames: string[] = Object.keys(part as Part);
    let normalizedNames: string[] = normalizeNames(variableNames);
    const data: VariableWithValue[] = [];
    variableNames.forEach((name: string) => {
        if (
            name === "name" ||
            name === "imageUrl" ||
            name === "priceWeight" ||
            part[name as keyof Part]?.toString() == null
        ) {
            normalizedNames.shift();
            return;
        }
        if (name === "type") {
            if (partType === PartType.PCB) {
                normalizePCBType(
                    part[name as keyof Part]?.toString() as string,
                    data,
                    normalizedNames
                );
                return;
            }
            normalizeStabilizerType(
                part[name as keyof Part]?.toString() as string,
                data,
                normalizedNames
            );
            return;
        }
        if (name === "pinType") {
            if (partType === PartType.PCB) {
                normalizePinType(
                    part[name as keyof Part]?.toString() as string,
                    data,
                    normalizedNames
                );
                return;
            }
            normalizeStabilizerType(
                part[name as keyof Part]?.toString() as string,
                data,
                normalizedNames
            );
            return;
        }
        if (name === "stabilizerType") {
            normalizeStabilizerType(
                part[name as keyof Part]?.toString() as string,
                data,
                normalizedNames
            );
            return;
        }
        if (name === "material" && (partType === PartType.KEYCAP_SET || partType === PartType.KEYCAP)) {
            normalizeKeycapMaterial(
                part[name as keyof Part]?.toString() as string,
                data,
                normalizedNames
            );
            return;
        }
        if (name === "price") {
            data.push({
                variable: normalizedNames[0],
                value: (part[name as keyof Part] as number).toFixed(2) + " $",
            });
            normalizedNames.shift();
            return;
        }
        if (name === "aswitch") {
            const switchData: Switch = part[
                name as keyof unknown
            ] as Switch;
            const switchVariableNames: string[] = Object.keys(
                part[name as keyof unknown] as Switch
            );
            let switchNormalizedNames: string[] = normalizeNames(switchVariableNames);
            switchVariableNames.forEach((name: string) => {
                if (
                    name === "priceWeight" ||
                    switchData[name as keyof Switch]?.toString() == null
                ) {
                    switchNormalizedNames.shift();
                    return;
                }
                if (name === "pinType") {
                    normalizePinType(
                        switchData[name as keyof Switch]?.toString() as string,
                        data,
                        switchNormalizedNames
                    );
                    return;
                }
                if (name === "switchType") {
                    normalizeSwitchType(
                        switchData[name as keyof Switch]?.toString() as string,
                        data,
                        switchNormalizedNames
                    );
                    return;
                }
                data.push({
                    variable: switchNormalizedNames[0],
                    value: switchData[name as keyof Switch]?.toString() as string,
                });
                switchNormalizedNames.shift();
            });
            normalizedNames.shift();
            return;
        }
        data.push({
            variable: normalizedNames[0],
            value: part[name as keyof Part]?.toString() as string,
        });
        normalizedNames.shift();
    });
    setData({
        imageUrl: part.imageUrl ?? "",
        variables: data,
        name: part.name,
    });

}
