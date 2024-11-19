import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { FooterCentered } from "./FooterCentered";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterCentered />
    </div>
  );
};

export default Layout;
