import * as Yup from "yup";
export const WebconFigValidate = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});