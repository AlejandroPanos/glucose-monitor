import { createContext, useReducer, useEffect } from "react";
import { checkAuth } from "../helpers/helpers";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return { ...state, user: action.payload, isAuthReady: true };
    case "LOGIN":
      return { ...state, user: action.payload, isAuthReady: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthReady: true };
    case "AUTH_READY":
      return { ...state, isAuthReady: true };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: null,
    isAuthReady: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await checkAuth();
        dispatch({ type: "LOGIN", payload: data });
      } catch (error) {
        console.error(error);
        console.log("No valid user");
        dispatch({ type: "AUTH_READY" });
      }
    };
    verifyUser();
  }, []);

  console.log("AuthContext state:", state);

  if (!state.isAuthReady) {
    return null;
  }

  return (
    <>
      <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
