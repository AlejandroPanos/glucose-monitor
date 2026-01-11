import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

import { Plus } from "lucide-react";
import user from "../../images/user.jpg";

const PageBar = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="w-full flex items-center justify-start gap-6 md:justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={user.avatar} alt="A user photo" />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-lg">Welcome, {user.name.split(" ")[0]}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={"/add-meal"}
            className="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md hover:cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Meal
          </Link>
          <Link
            to={"/add-log"}
            className="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md hover:cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Log
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageBar;
