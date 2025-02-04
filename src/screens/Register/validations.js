import * as Yup from "yup";

export const registrationValidations = Yup.object().shape({
  email: Yup.string().email("Моля въведете валиден имейл").required("Моля въведете имейл").label("email"),
  password: Yup.string().required("Моля въведете парола").min(3).label("password"),
  first_name: Yup.string().required("Моля въведете име").min(3).label("first_name"),
  last_name: Yup.string().required("Моля въведете име").min(3).label("last_name"),
  phone_number: Yup.string().required("Моля въведете телефонен номер").min(3).label("phone_number"),
});

export const validations = registrationValidations;
