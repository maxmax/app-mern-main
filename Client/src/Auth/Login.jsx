import { Box, Typography, Button } from '@mui/material';
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../components/Input";
import useApi from "../hooks/useApi";
import FormikErr from "../Errors/FormikErr";
import AppServerErr from "../Errors/AppServerErr";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = ({ setShow }) => {
  
  const { Login, op } = useApi();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      Login({ email, password });
    },
    validationSchema: schema,
  });

  return (
    <Box>
      <Typography align="center" variant="h4" gutterBottom>
        Sign in
      </Typography>
      <AppServerErr>
        {op.serverErr === "Network Error" ? op.serverErr : null}
      </AppServerErr>
      <form className="mt-6" onSubmit={formik.handleSubmit}>
        <Input
          label={"Email"}
          type={"email"}
          name={"email"}
          value={formik.values.email}
          onChange={formik.handleChange("email")}
        />
        <FormikErr
          touched={formik.touched.email}
          errors={formik.errors.email}
        />
        <AppServerErr>
          {op.appErr === "Email does not exist" && op.appErr}
        </AppServerErr>
        <Input
          label={"Password"}
          type={"password"}
          name={"password"}
          value={formik.values.password}
          onChange={formik.handleChange("password")}
        />
        <FormikErr
          touched={formik.touched.password}
          errors={formik.errors.password}
        />
        <AppServerErr>
          {op.appErr === "Invalid Password" && op.appErr}
        </AppServerErr>
        <Button type="submit" variant="contained" fullWidth>Login</Button>
      </form>

      <Typography align="center" sx={{ mt: 2 }}>
        Don&apos;t have an account?
        <Button
          variant="text"
          onClick={() => setShow(true)}
        >
          Sign up
        </Button>
      </Typography>
    </Box>
  );
};

export default Login;
