import { Box, Typography, Button } from '@mui/material';
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../components/Input";
import FormikErr from "../Errors/FormikErr";
import useApi from "../hooks/useApi";
import AppServerErr from "../Errors/AppServerErr";

const schema = yup.object({
  fullname: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Register = ({ setShow }) => {
  
  const { Register, op } = useApi();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    onSubmit: ({ fullname, email, password }) => {
      Register({ fullname, email, password });
    },
    validationSchema: schema,
  });

  return (
    <Box>
      <Typography align="center" variant="h4" gutterBottom>
        Sign up
      </Typography>
      <AppServerErr>
        {op.serverErr === "Network Error" ? op.serverErr : null}
      </AppServerErr>
      <form className="mt-6" onSubmit={formik.handleSubmit}>
        <Input
          label={"Fullname"}
          type={"text"}
          name={"fullname"}
          value={formik.values.fullname}
          onChange={formik.handleChange("fullname")}
        />
        <FormikErr
          touched={formik.touched.fullname}
          errors={formik.errors.fullname}
        />
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
          {op.appErr === "Email already exists, try with a different one" &&
            op.appErr}
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
        <Button type="submit" variant="contained" fullWidth>Register</Button>
      </form>
      <Typography align="center" sx={{ mt: 2 }}>
        Already have an account?
        <Button
          variant="text"
          onClick={() => setShow(false)}
        >
          Sign in
        </Button>
      </Typography>
    </Box>
  );
};

export default Register;
