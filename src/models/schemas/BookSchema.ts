import * as yup from "yup";

export const bookSchema = yup.object().shape({
    title: yup
      .string()
      .required(),
    price: yup
      .number()
      .required(),
    author: yup
      .string()
      .required(),
    description: yup
      .string()
      .required(),
  });
