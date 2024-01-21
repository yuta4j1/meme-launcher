import { useContext } from "react";
import { DispatchNotifierStateContext } from "../components/NotifierContextProvider";

export const useDispatchNotifierState = () => {
  return useContext(DispatchNotifierStateContext);
};
