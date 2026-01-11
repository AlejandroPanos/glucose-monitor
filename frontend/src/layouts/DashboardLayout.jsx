import { useState } from "react";
import { Outlet } from "react-router";
import Aside from "../components/private/Aside";

const DashboardLayout = () => {
  const [asideClose, setAsideClose] = useState(false);

  return (
    <div className="flex">
      <Aside close={asideClose} setClose={setAsideClose} />
      <main className={`flex-1 transition-all ${asideClose ? "md:ml-20" : "md:ml-52"} ml-0`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
