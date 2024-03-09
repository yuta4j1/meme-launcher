import { FC, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";
import { CheckIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import type { NotifierState, NotifierType } from "../types";
import styles from "./NotifierToaster.module.css";

const toasterIconMap: { [key in NotifierType]: ReactNode } = {
  success: <CheckIcon height={20} width={20} />,
  error: <CrossCircledIcon height={20} width={20} />,
};

export const NotifierToaster: FC<{
  state: NotifierState;
  handleOpenChange: (open: boolean) => void;
}> = ({ state, handleOpenChange }) => {
  return (
    <Toast.Provider>
      <Toast.Root
        className={styles.ToastRoot}
        open={state.show}
        onOpenChange={handleOpenChange}
        style={{
          outline: state.show ? `1px solid ${state.color}` : "none",
        }}
      >
        <Toast.Title className={styles.ToastTitle}>
          <div
            className={styles.TitleIcon}
            style={{
              color: state.show ? state.color : "#fff",
            }}
          >
            {state.show ? toasterIconMap[state.type] : null}
          </div>
          <span className={styles.TitleText}>
            {state.show ? state.message : ""}
          </span>
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
};
