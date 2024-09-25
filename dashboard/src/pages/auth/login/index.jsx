import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { login } from "../../../redux/slices/staff";
import { useEffect } from "react";
import { handleToast } from "../../../utils/toast";

// Validation schema using Yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();

  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Dispatch login action with form values
      dispatch(login(values));
    },
  });

  const error = useSelector((state) => state.staff.error);
  const staff = useSelector((state) => state.staff.me?.data);
  console.log(staff);
  const status = useSelector((state) => state.staff.status);
  useEffect(() => {
    if (error) {
      handleToast("error", error.mes, "top-right");
    }
  }, [error]);

  useEffect(() => {
    if (status === "success") {
      handleToast("success", "Login successful", "top-right");
    }
  }, [status]);

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
