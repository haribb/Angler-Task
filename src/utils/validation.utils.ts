import * as yup from "yup";

export const testYup = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export const createProduct = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  code: yup.string().required("Please enter your code"),

});
