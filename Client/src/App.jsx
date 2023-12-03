import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/Auth";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import CreatePost from "./Posts/CreatePost";
import EditPost from "./Posts/EditPost";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update/:id" element={<EditPost />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
