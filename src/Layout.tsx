import { Outlet, Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "./modules/auth/current-user.state";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useFlashMessage } from "./modules/flash-message/flash-message.state";
import FlashMessageArea from "./components/FlashMessage";

const Layout = () => {
  const { message } = useFlashMessage();
  const currentUser = useAtomValue(currentUserAtom);

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div className="youtube-container">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      {message != null && <FlashMessageArea message={message} />}
    </div>
  );
};

export default Layout;
