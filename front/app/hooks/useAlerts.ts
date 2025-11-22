import { useContext } from "react";
import { Context as AlertsContext } from "../contexts/AlertsContext";

const useAlerts = () => {
  return useContext(AlertsContext);
};

export default useAlerts;
