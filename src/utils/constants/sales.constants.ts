import * as yup from "yup";


export const DELIVERY_SERVICE_VALIDATION_SCHEMA = yup.object({
    name: yup.string().required(),
    phone: yup.string().required(),
});

export const DELIVERY_SERVICE_DEFAULT_VALUES = {
    name: "",
    phone: "",
};