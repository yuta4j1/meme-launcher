import {
  type FC,
  type ReactNode,
  useState,
  useRef,
  createContext,
} from "react";
import NotifierToaster from "./NotifierToaster";
import type { NotifierState } from "./types";

export const DispatchNotifierStateContext = createContext<
  (state: NotifierState) => void
>(() => {});

export const NotifierContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifierState, setNotifierState] = useState<NotifierState>({
    show: false,
  });
  const timerRef = useRef(0);

  const handleSetNotifierState = (state: NotifierState) => {
    setNotifierState({ show: false });
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setNotifierState(state);
    }, 100);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNotifierState({ show: false });
    }
  };

  return (
    <DispatchNotifierStateContext.Provider value={handleSetNotifierState}>
      {children}
      <NotifierToaster
        state={notifierState}
        handleOpenChange={handleOpenChange}
      />
    </DispatchNotifierStateContext.Provider>
  );
};

export default NotifierContextProvider;
