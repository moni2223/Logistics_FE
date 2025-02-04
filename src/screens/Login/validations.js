import * as Yup from "yup";

export const loginValidations = Yup.object().shape({
  email: Yup.string().email("Моля въведете валиден имейл").required("Моля въведете имейл").label("email"),
  password: Yup.string().required("Моля въведете парола").min(3).label("password"),
});

export const validations = { login: loginValidations };
