import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Register from "../Auth/Register";
import Login from "../Auth/Login";

const Authentication = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ m: 2, mt: 10, p: 2 }}>
        {show ? <Register setShow={setShow} /> : <Login setShow={setShow} />}
      </Paper>
    </Container>
  );
};

export default Authentication;
