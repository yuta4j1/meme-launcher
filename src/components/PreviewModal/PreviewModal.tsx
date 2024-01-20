import { type FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./PreviewModal.module.css";

type PreviewImage = {
  id: number;
  imageUrl: string;
  categoryId: number;
  tagList: string[];
};

export const PreviewModal: FC<{
  open: boolean;
  onClose: () => void;
  previewImage: PreviewImage;
}> = ({ open, onClose, previewImage }) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.previewModalOverlay} />
        <Dialog.Content
          className={styles.previewModalContent}
          style={{
            backgroundImage: `url(${previewImage.imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
