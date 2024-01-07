import { FC, useState, useRef, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import useSWR from "swr";
import { getRequest } from "../../api";
import type { CategoriesResponse } from "../../types/category";
import { keywordIdGen } from "../../util/random";
import { RxCross1 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import "./UploadModal.css";

type Keyword = {
  id: string;
  value: string;
};

export const UploadModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([
    { id: keywordIdGen(), value: "" },
  ]);

  const { data, isLoading, error } = useSWR<CategoriesResponse>(
    "/categories",
    getRequest
  );

  // TODO: Selector を別コンポーネントに切りたい
  // TODO: Selector を制御コンポーネントにしたい

  const showCategoryItems = useMemo(() => {
    return !isLoading && error === undefined && data !== undefined;
  }, [data, isLoading, error]);

  const uploadFileUrl = useMemo(() => {
    if (!uploadFile) return null;
    return URL.createObjectURL(uploadFile);
  }, [uploadFile]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        // ステートの初期化
        setUploadFile(null);
        setKeywords([{ id: keywordIdGen(), value: "" }]);
        onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <div className="modal-header">
            <Dialog.Title>Upload your meme</Dialog.Title>
            <Dialog.Description>
              If you have images you would like to add to the list, you can
              upload them here.
            </Dialog.Description>
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileRef}
            onChange={(e) => {
              const files = e.target.files;
              if (files && files?.length > 0) {
                setUploadFile(files.item(0));
              }
            }}
          />
          <div className="scrollabel-area">
            <div className="upload-container">
              <div
                className="droppable-area"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files;
                  setUploadFile(files.item(0));
                }}
                onClick={() => {
                  /** TODO: a11y check */
                  fileRef.current?.click();
                }}
              >
                {uploadFile === null &&
                  "ファイルをドラッグ&ドロップしてください"}
                {uploadFile !== null && uploadFileUrl !== null && (
                  <img src={uploadFileUrl} width="500" height="300" />
                )}
              </div>
            </div>
            <section>
              <h2>Choose image feeling</h2>
              <div>
                <Select.Root>
                  <Select.Trigger
                    className="select-trigger"
                    aria-label="feeling"
                  >
                    <Select.Value placeholder="Select image feeling..." />
                    <Select.Icon className="select-icon">
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="select-content">
                      <Select.ScrollUpButton>
                        <ChevronUpIcon />
                      </Select.ScrollUpButton>
                      <Select.Viewport className="select-viewport">
                        <Select.Group>
                          {isLoading && (
                            <div className="select-data-message">
                              loading...
                            </div>
                          )}
                          {error !== undefined && (
                            <div className="select-data-message">
                              データの取得に失敗しました
                            </div>
                          )}
                          {showCategoryItems &&
                            data?.map((v) => (
                              <SelectItem
                                key={v.id}
                                value={v.id}
                                text={`${v.emoji} ${v.name}`}
                              />
                            ))}
                        </Select.Group>
                        <Select.Separator className="SelectSeparator" />
                      </Select.Viewport>
                      <Select.ScrollDownButton className="SelectScrollButton">
                        <ChevronDownIcon />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </section>
            <section>
              <h2>Tag or Keyword</h2>
              <div className="keyword-input-container">
                {keywords.map((v) => (
                  <div className="input-row">
                    <KeywordInput
                      key={v.id}
                      value={v.value}
                      handleChange={(s: string) =>
                        setKeywords((prev) =>
                          prev.map((vv) =>
                            vv.id === v.id ? { id: vv.id, value: s } : vv
                          )
                        )
                      }
                    />
                    <button
                      className="delete-row-button"
                      onClick={() =>
                        setKeywords((prev) => prev.filter((p) => p.id !== v.id))
                      }
                    >
                      <RxCross1 />
                    </button>
                  </div>
                ))}
              </div>
              <div className="plus-button-container">
                <button
                  className="plus-button"
                  onClick={() =>
                    setKeywords((prev) => [
                      ...prev,
                      { id: keywordIdGen(), value: "" },
                    ])
                  }
                >
                  <FiPlus size={16} />
                  <span className="plus-button-text">Add Keyword</span>
                </button>
              </div>
            </section>
          </div>
          <div style={{ height: "16px" }}></div>
          <div className="modal-footer">
            <div className="modal-footer-button-container">
              <Dialog.Close asChild>
                <button className="modal-button cancel-button">Cancel</button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button className="modal-button upload-button">
                  <IoCloudUploadOutline />
                  <span className="upload-button-text">Upload</span>
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const KeywordInput: FC<{
  value: string;
  handleChange: (v: string) => void;
}> = ({ value, handleChange }) => {
  return (
    <input
      type="text"
      className="keyword-input"
      value={value}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
};

const SelectItem: FC<{ value: number; text: string }> = ({ value, text }) => {
  return (
    <Select.Item value={String(value)} className="select-item">
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator className="select-item-indicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
