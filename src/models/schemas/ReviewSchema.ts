import * as yup from "yup";

export const reviewSchema = yup.object().shape({
    review: yup
      .number()
      .required(),
    comment: yup
      .string()
      .required(),
  });