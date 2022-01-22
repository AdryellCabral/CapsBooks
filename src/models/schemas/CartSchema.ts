import * as yup from "yup";

export const cartSchema = yup.object().shape({
    products_ids: yup
      .array()
      .required(),
  });