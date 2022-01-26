import * as yup from "yup";

export const cartSchema = yup.object().shape({
    books_ids: yup
      .array()
      .required(),
  });