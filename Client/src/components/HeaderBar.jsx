import { useNavigate } from "react-router";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button
} from '@mui/material';

import { useAuth } from "../context/Auth";
import useApi from "../hooks/useApi";

const HeaderBar = () => {
  
  const { setUser, setDData } = useAuth();

  const nav = useNavigate();

  const { Logout, op } = useApi();

  const logoutHandler = () => {
    Logout();
    setUser("");
    setDData([])
    if (!op?.loading) nav("/auth");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App
            </Typography>
            <Button onClick={logoutHandler} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default HeaderBar;
