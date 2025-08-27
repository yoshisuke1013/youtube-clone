import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetAtom } from "jotai";
import { currentUserAtom } from "./modules/auth/current-user.state";
import { authRepository } from "./modules/auth/auto.repository";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./Layout";
import Home from "./pages/Home";
import CreateVideo from "./pages/CreateVideo";
import MyVideos from "./pages/MyVideos";
import VideoDetail from "./pages/VideoDetail";
import EditProfile from "./pages/EditProfile";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create-video" element={<CreateVideo />} />
          <Route path="/my-videos" element={<MyVideos />} />
          <Route path="/videos/:id" element={<VideoDetail />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
