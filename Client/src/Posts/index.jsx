import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Post from "./Post";
import { useEffect } from "react";
import useApi from "../hooks/useApi";

const Posts = ({ fetchAgain }) => {
  const { dData } = useAuth();

  const { Fetch } = useApi();

  useEffect(() => {
    Fetch();
  }, [fetchAgain]);

  return (
    <Box>
      <Button sx={{ m: 2, mt: 3 }} variant="contained" component={Link} to="/create-post">
        New posts
      </Button>
      {dData && dData?.map((data, index) => (
        <Post key={index} data={data} />
      ))}
    </Box>
  );
};


export default Posts;
