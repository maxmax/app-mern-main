import { useNavigate, useParams } from "react-router";

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
// import { TextField } from 'formik-material-ui';

import useApi from "../hooks/useApi"

const formSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Just add a few words"),
});

const EditPost = () => {

  const nav = useNavigate();

  const { dData, fetchAgain, setFetchAgain } = useAuth();

  const { op, Update } = useApi();

  const { id } = useParams();

  const data = dData.find((data) => data._id === id);

  if (!data) alert("Card doesn't exist");

  const formik = useFormik({
    initialValues: {
      title: data?.title,
      description: data?.description,
    },
    onSubmit: ({ title, description }) => {
      Update({ id, title, description })
      setFetchAgain(!fetchAgain)
      if (!op.loading) nav("/");
    },
    validationSchema: formSchema,
  });

  return (
    <Container maxWidth="sm">
      <Paper sx={{ m: 2, mt: 10, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Edit post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label={"Title"}
            type={"text"}
            name={"title"}
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <TextField
            label={"Description"}
            name={"description"}
            rows={5}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <Button type="submit" variant="contained">Update</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditPost;
