import Posts from "../Posts";
import HeaderBar from "../components/HeaderBar";
import { useAuth } from "../context/Auth";

const Home = () => {
  const { user, fetchAgain, setFetchAgain } = useAuth();
  return (
    <>
      {user && (
        <>
          <HeaderBar />
          <Posts fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </>
      )}
    </>
  );
};

export default Home;
