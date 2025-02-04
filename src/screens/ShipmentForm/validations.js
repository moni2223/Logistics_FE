import * as Yup from "yup";

export const shipmentValidations = Yup.object().shape({
  recipient: Yup.object().shape({
    label: Yup.string().required("Моля изберете получател").label("label"),
  }),
  weight: Yup.number().required("Моля въведете тегло").label("weight"),
  delivery_type: Yup.object().shape({
    label: Yup.string().required("Моля изберете тип на доставка").label("label"),
    value: Yup.string().required("Моля изберете тип на доставка").label("value"),
  }),
  delivery_address: Yup.lazy((value, context) => {
    return context.parent.delivery_type?.value === "OFFICE"
      ? Yup.object({
          label: Yup.string().required("Моля изберете офис"),
          value: Yup.string().required("Моля изберете офис"),
        })
      : Yup.string().required("Моля въведете адрес за доставка").min(3, "Адресът трябва да съдържа поне 3 символа");
  }),
});

export const validations = shipmentValidations;
