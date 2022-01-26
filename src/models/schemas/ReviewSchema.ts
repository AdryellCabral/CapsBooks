import * as yup from "yup";

export const reviewSchema = yup.object().shape({
    review: yup
      .number()
      .integer()
      .min(1)
      .max(10)
      .required(),
    comment: yup
      .string()
      .required(),
  });