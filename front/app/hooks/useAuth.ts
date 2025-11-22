import { useContext } from "react";
import { Context as AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
