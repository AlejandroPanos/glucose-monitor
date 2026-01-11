import { Outlet } from "react-router";
import Navbar from "../components/public/Navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-4 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
