import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-30 px-4 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
