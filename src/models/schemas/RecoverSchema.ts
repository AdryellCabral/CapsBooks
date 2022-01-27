import * as yup from "yup";

export const recoverSchema = yup.object().shape({
  email: yup.string().email().required(),
});
