import { MakeKeyboardStrings, PartData } from '../../store/keyboard-store/types/keyboard.type';
import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";
import { MakeKeyboard } from "../../store/keyboard-store/types/keyboard.type";

export const useCreateKeyboardBuyer = () => {
    const { axios } = useAxios();
    const createKeyboardBuyer = async (keyboard: MakeKeyboard): Promise<ApiResponse<PartData | null>> => {
        const keyboardStrings = {
            name: keyboard.name, cable: keyboard.cable?.name,
            caseEntity: keyboard.caseEntity?.name, pcb: keyboard.pcb?.name, stabilizers: keyboard.stabilizers?.name,
            plate: keyboard.plate?.name, switchSet: keyboard.switchSet?.name, keycapSet: keyboard.keycapSet?.name,
            isAssembled: keyboard.isAssembled, switchesLubed: keyboard.switchesLubed
        } as MakeKeyboardStrings
        try {
            var res = await axios.post(`/keyboard/buyer`, keyboardStrings);
            toast.success("Keyboard successfuly created!");
            return {
                data: res.data,
                error: null,
                status: "SUCCESS",
            };
        } catch (e: any) {
            toast.error(e.response.data.message);
            return {
                data: null,
                error: e.response.data.message,
                status: "ERROR",
            };
        }
    };

    return {
        createKeyboardBuyer,
    };
};
