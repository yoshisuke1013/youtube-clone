import { Outlet, Navigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "./modules/auth/current-user.state";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const Layout = () => {
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
    </div>
  );
};

export default Layout;
