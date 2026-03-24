import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AppDownload from "../components/AppDownload/AppDownload";

export default function Layout({ setShowLogin }) {
  return (
    <>
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Outlet />
      </div>
      <AppDownload />
      <Footer />
    </>
  );
}
