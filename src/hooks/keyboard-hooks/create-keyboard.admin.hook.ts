import { MakeKeyboardStrings } from './../../store/keyboard-store/types/keyboard.type';
import { toast } from "react-toastify";
import { ApiResponse } from "../../store/auth-store/types/response.type";
import { useAxios } from "../../utils/axios.hook";
import { MakeKeyboard } from "../../store/keyboard-store/types/keyboard.type";

export const useCreateKeyboardAdmin = () => {
    const { axios } = useAxios();
    const createKeyboardAdmin = async (keyboard: MakeKeyboard): Promise<ApiResponse<null>> => {
        const keyboardStrings = {
            name: keyboard.name, cable: keyboard.cable?.name,
            caseEntity: keyboard.caseEntity?.name, pcb: keyboard.pcb?.name, stabilizers: keyboard.stabilizers?.name,
            plate: keyboard.plate?.name, switchSet: keyboard.switchSet?.name, keycapSet: keyboard.keycapSet?.name,
            image: keyboard.image
        } as MakeKeyboardStrings
        try {
            await axios.post(`/keyboard/admin`, keyboardStrings, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Keyboard successfuly created!");
            return {
                data: null,
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
        createKeyboardAdmin,
    };
};
