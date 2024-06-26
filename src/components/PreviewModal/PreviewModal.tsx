import { FC, useState, useEffect } from "react";
import { fetch, ResponseType } from "@tauri-apps/api/http";
import clipboard from "tauri-plugin-clipboard-api";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CopyLoader } from "./CopyLoader";
import { CopyCompleted } from "./CopyCompleted";
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
  const [isCopying, setIsCopying] = useState(false);
  // hooks化しても良いかも
  const [isDoneCopy, setIsDoneCopy] = useState(false);

  useEffect(() => {
    if (!isDoneCopy) {
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    if (isDoneCopy) {
      timer = setTimeout(() => {
        setIsDoneCopy(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isDoneCopy, setIsDoneCopy]);

  const handleCopyButtonClick = async () => {
    setIsCopying(true);
    const response = await fetch<Uint8Array>(previewImage.imageUrl, {
      method: "GET",
      responseType: ResponseType.Binary,
    });
    try {
      await clipboard.writeImageBinary(Array.from(response.data));
      setIsDoneCopy(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCopying(false);
    }
  };

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
          <div className={styles.modalContentContainer}>
            {isCopying && (
              <div className={styles.interactionWrapper}>
                <CopyLoader />
              </div>
            )}
            {isDoneCopy && (
              <>
                <div className={styles.interactionWrapper}></div>
                <CopyCompleted />
              </>
            )}
            <button
              className={styles.copyButton}
              onClick={() => {
                handleCopyButtonClick();
              }}
            ></button>
          </div>
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
    let timer: NodeJS.Timeout;
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
            clipboard.writeText(tag);
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
