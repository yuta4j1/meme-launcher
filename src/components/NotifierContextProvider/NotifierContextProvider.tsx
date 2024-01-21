import {
  type FC,
  type ReactNode,
  useState,
  useRef,
  createContext,
} from "react";
import * as Toast from "@radix-ui/react-toast";
import styles from "./NotifierContextProvider.module.css";

type NotifierStateType = "success" | "error";

type NotifierState =
  | {
      show: true;
      message: string;
      type: NotifierStateType;
    }
  | {
      show: false;
    };

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

  return (
    <Toast.Provider>
      <DispatchNotifierStateContext.Provider value={handleSetNotifierState}>
        {children}
      </DispatchNotifierStateContext.Provider>
      <Toast.Root
        className={styles.ToastRoot}
        open={notifierState.show}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setNotifierState({ show: false });
          }
        }}
      >
        <Toast.Title className={styles.ToastTitle}>
          <div className={styles.TitleIcon}>🎉</div>
          <span className={styles.TitleText}>
            {notifierState.show ? notifierState.message : ""}
          </span>
        </Toast.Title>
        {/* <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="Button small green">Undo</button>
        </Toast.Action> */}
      </Toast.Root>
      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
};

export default NotifierContextProvider;
