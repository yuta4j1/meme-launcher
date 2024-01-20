import { useState, Fragment } from "react";
import * as Popover from "@radix-ui/react-popover";
import UploadModal from "../UploadModal";
import { DotsVerticalIcon, ImageIcon } from "@radix-ui/react-icons";
import styles from "./PopoverMenu.module.css";

export const PopoverMenu = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Fragment>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className={styles.menuButton} aria-label="メニューを開く">
            <DotsVerticalIcon width={16} height={16} />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.popoverContainer}>
            <button
              className={styles.uploadActionButton}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <ImageIcon />
              <span className={styles.uploadActionButtonText}>
                画像を追加する
              </span>
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <UploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Fragment>
  );
};
