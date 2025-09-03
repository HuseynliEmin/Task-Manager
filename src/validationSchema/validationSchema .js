import * as Yup from "yup";

// login schema
export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid.")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters long.")
        .required("Password is required"),
});

//register schema
export const registerValidationSchema = Yup.object({
  sureName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});



