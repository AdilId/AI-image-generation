import { Header } from "./components";
import {
  Home,
  Register,
  Login,
  Generate,
  Post,
  UpdatePost,
  Profile,
  UpdatePassword,
  UpdateImg,
} from "./pages";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/posts/:id/show" element={<Post />} />
        <Route path="/posts/:id/update" element={<UpdatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/profile/update-password/:id"
          element={<UpdatePassword />}
        />
        <Route path="/profile/update-img/:id" element={<UpdateImg />} />
      </Routes>
    </div>
  );
};

export default App;
