import * as yup from 'yup';

export const LOGIN_VALIDATION_SCHEMA = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const LOGIN_DEFAULT_VALUES = {
  email: '',
  password: '',
};

export const REGISTER_VALIDATION_SCHEMA = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(9)
    .matches(
      /^[0-9a-zA-Z!?]{9}[0-9a-zA-Z!?]*/,
      'Password must be at least 9 characters long'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  name: yup.string().required(),
  surname: yup.string().required(),
  phone: yup.string().required(),
  address: yup.object().shape({
    street: yup.string().required(),
    streetNumber: yup.string().required(),
    city: yup.string().required(),
    zipCode: yup.string().required(),
    country: yup.string().required(),
  }),
});

export const REGISTER_DEFAULT_VALUES = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  surname: '',
  phoneNumber: '',
};
export const REGISTER_USER_DEFAULT_VALUES = {
  name: '',
  surname: '',
  email: '',
  address: {
    street: '',
    streetNumber: '',
    city: '',
    zipCode: '',
    country: '',
  },
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  role: 'ENGINEER',
};
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
