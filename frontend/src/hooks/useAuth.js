import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
  const user = useContext(AuthContext);

  if (!user) {
    throw Error("useAuth must be used inside authContextProvider");
  }

  return user;
};
