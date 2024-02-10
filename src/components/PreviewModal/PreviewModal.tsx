import { type FC, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Cross1Icon } from "@radix-ui/react-icons";
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
        >
          <TagList tagList={previewImage.tagList} />
          <button className={styles.previewModalCloseButton} onClick={onClose}>
            <Cross1Icon width={40} height={40} />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const TagList: FC<{ tagList: string[] }> = ({ tagList }) => {
  return (
    <div className={styles.tagList}>
      <Tooltip.Provider>
        {tagList.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </Tooltip.Provider>
    </div>
  );
};

const Tag: FC<{ tag: string }> = ({ tag }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timer: number;
    if (showTooltip) {
      timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showTooltip, setShowTooltip]);

  return (
    <Tooltip.Root open={showTooltip}>
      <Tooltip.Trigger asChild>
        <button
          className={styles.tagButton}
          onClick={() => {
            copyToClipboard(tag);
            setShowTooltip(true);
          }}
        >
          {tag}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
          Copied!
          <Tooltip.Arrow className={styles.tooltipArrow} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

async function copyToClipboard(text: string): Promise<void> {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  try {
    await navigator.clipboard.write(data);
    // clipboard成功の処理書く
  } catch (err) {
    console.error(err);
  }
}
