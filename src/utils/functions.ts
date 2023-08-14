import { MakeKeyboard } from "../store/keyboard-store/types/keyboard.type";

export function calculateDisabled(activeStep: number, keyboard: MakeKeyboard): boolean {
    if (activeStep === 0) return false
    if (activeStep === 1) return keyboard.caseEntity === undefined;
    if (activeStep === 2) return keyboard.pcb === undefined;
    if (activeStep === 3) return false;
    if (activeStep === 4) return keyboard.cable === undefined && !keyboard.pcb?.btConnect;
    if (activeStep === 5) return false;
    if (activeStep === 6) return keyboard.stabilizers === undefined;
    if (activeStep === 7) return false;
    return true
}




