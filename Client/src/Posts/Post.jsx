import { useNavigate } from "react-router";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@mui/material';
import { useAuth } from "../context/Auth";
import useApi from "../hooks/useApi";

const Post = ({ data }) => {

  const { setDData, fetchAgain, setFetchAgain } = useAuth();
  const { Delete, op } = useApi();
  const nav = useNavigate();

  const updateHandler = () => {
    nav(`/update/${data._id}`);
  };

  const deleteHandler = () => {
    Delete({ id: data._id });
    setDData((dData) => dData.filter((i) => i._id !== data._id));
    setFetchAgain(!fetchAgain);
  };

  return (
    <Card sx={{ minWidth: 275, m: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={updateHandler}>Edit</Button>
        <Button size="small" onClick={deleteHandler}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
