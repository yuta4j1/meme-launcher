import styles from "./CopyLoader.module.css";

export const CopyLoader = () => {
  return (
    <div className={styles.ballSpinFadeLoader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
