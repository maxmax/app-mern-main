import { useNavigate } from "react-router";
import {
  Container,
  Paper,
  Button,
  Typography
} from '@mui/material';

import Input from "../components/Input";
import TextField from "../components/TextField";
import { useAuth } from "../context/Auth";
import * as yup from "yup";
import { useFormik } from "formik";
import useApi from "../hooks/useApi";
import FormikErr from "../Errors/FormikErr";
import AppServerErr from "../Errors/AppServerErr";

const formSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Just add a few words"),
});

const CreatePost = () => {
  const nav = useNavigate();
  const { fetchAgain, setFetchAgain } = useAuth();
  const { op, Create } = useApi();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: ({ title, description }) => {
      Create({ title, description });
      setFetchAgain(!fetchAgain);
      if (!op.loading) nav("/");
    },
    validationSchema: formSchema,
  });

  return (
    <Container maxWidth="sm">
      <Paper sx={{ m: 2, mt: 10, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          New Post
        </Typography>
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <Input
            label={"Title"}
            type={"text"}
            name={"title"}
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <FormikErr
            touched={formik.touched.title}
            errors={formik.errors.title}
          />
          <TextField
            label={"Description"}
            name={"description"}
            rows={5}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <FormikErr
            touched={formik.touched.description}
            errors={formik.errors.description}
          />
          <AppServerErr>{op.appErr && op.appErr}</AppServerErr>
          <Button type="submit" variant="contained">Create</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost;
