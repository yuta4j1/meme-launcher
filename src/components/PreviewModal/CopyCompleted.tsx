import { CheckIcon } from "@radix-ui/react-icons";
import styles from "./CopyCompleted.module.css";

export const CopyCompleted = () => {
  return (
    <div className={styles.container}>
      <CheckIcon height={100} width={100} />
      <div>クリップボードにコピーしました</div>
    </div>
  );
};
