import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { userLogout } from "../../helpers/helpers";
import {
  House,
  Utensils,
  Logs,
  Settings,
  LogOut,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Menu,
  X,
  CirclePlus,
  Users,
} from "lucide-react";

import logo from "../../images/logo.svg";

const Aside = ({ close, setClose }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setMobileOpen(false);
  };

  const handleOpen = () => {
    setClose((prev) => !prev);
  };

  const activeCss =
    "text-blue-700 bg-blue-100 flex items-center gap-2 p-3 hover:cursor-pointer rounded-lg transition-all duration-200";
  const inactiveCss =
    "text-gray-600 flex items-center gap-2 p-3 hover:cursor-pointer hover:bg-stone-100 rounded-lg transition-all duration-200";
  const textCss = `text-sm transition-all ${close ? "hidden" : "block"}`;

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 right-6 z-50 p-2 bg-white border border-gray-300 rounded-lg shadow-md"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-slate-50 shrink-0 overflow-y-auto z-40 transform transition-all ${
          close ? "md:w-20" : "md:w-52"
        } ${mobileOpen ? "translate-x-0 w-52" : "-translate-x-full md:translate-x-0"}`}
      >
        <nav className="h-full flex flex-col justify-between p-4 border-r border-gray-300">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img
                className={`overflow-hidden transition-all ${
                  close && !mobileOpen ? "w-0" : "w-40"
                }`}
                src={logo}
                alt="The app's logo"
              />
              <button
                onClick={handleOpen}
                className="hidden md:block text-gray-600 p-2 rounded-lg hover:bg-stone-200 hover:cursor-pointer"
              >
                {close ? (
                  <ArrowRightFromLine className="w-5 h-5" />
                ) : (
                  <ArrowLeftFromLine className="w-5 h-5" />
                )}
              </button>
            </div>

            <hr className="text-gray-300" />

            <div className="flex flex-col gap-2">
              <NavLink
                to={"dashboard"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? activeCss : inactiveCss)}
              >
                <House className="w-5 h-5" />
                <p className={`${textCss} md:${textCss} block md:${textCss}`}>Dashboard</p>
              </NavLink>
              <NavLink
                to={"meals"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? activeCss : inactiveCss)}
              >
                <Utensils className="w-5 h-5" />
                <p className={`${textCss} md:${textCss} block md:${textCss}`}>Meals</p>
              </NavLink>
              <NavLink
                to={"logs"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? activeCss : inactiveCss)}
              >
                <Logs className="w-5 h-5" />
                <p className={`${textCss} md:${textCss} block md:${textCss}`}>Logs</p>
              </NavLink>
            </div>

            <hr className="text-gray-300" />

            <div className="flex flex-col gap-2">
              <NavLink
                to={"add-meal"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? activeCss : inactiveCss)}
              >
                <CirclePlus className="w-5 h-5" />
                <p className={`${textCss} md:${textCss} block md:${textCss}`}>Add Meal</p>
              </NavLink>
              <NavLink
                to={"add-log"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? activeCss : inactiveCss)}
              >
                <CirclePlus className="w-5 h-5" />
                <p className={`${textCss} md:${textCss} block md:${textCss}`}>Add Log</p>
              </NavLink>
            </div>

            {user.role === "admin" && (
              <>
                <hr className="text-gray-300" />

                <div className="flex flex-col gap-2">
                  <NavLink
                    to={"users"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => (isActive ? activeCss : inactiveCss)}
                  >
                    <Users className="w-5 h-5" />
                    <p className={`${textCss} md:${textCss} block md:${textCss}`}>All Users</p>
                  </NavLink>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <hr className="text-gray-300" />
            <div className="flex flex-col gap-2">
              <NavLink
                to={"settings"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? activeCss : inactiveCss)}
              >
                <Settings className="w-5 h-5" />
                <p className={`${textCss} md:${textCss} block md:${textCss}`}>Settings</p>
              </NavLink>
              <div
                onClick={handleLogout}
                className="text-red-700 flex items-center gap-2 p-3 hover:cursor-pointer hover:bg-red-100 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <p className={`${textCss} md:${textCss} block md:${textCss}`}>Log Out</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Aside;
