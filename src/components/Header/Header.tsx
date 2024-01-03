import { useState, useRef, useMemo } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import * as Dialog from "@radix-ui/react-dialog";
import "./Header.css";

/** TODO: コンポーネント分割 */
export function Header() {
  const [searchKey, setSearchKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const uploadFileUrl = useMemo(() => {
    if (!uploadFile) return null;
    return URL.createObjectURL(uploadFile);
  }, [uploadFile]);
  return (
    <header className="header-container">
      <input
        className="search-input"
        type="text"
        value={searchKey}
        placeholder="Search your feeling or meme..."
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <div className="header-menu-container">
        <Dialog.Root
          open={modalOpen}
          onOpenChange={() =>
            setModalOpen((v) => {
              setUploadFile(null);
              return !v;
            })
          }
        >
          <Dialog.Trigger asChild>
            <button className="upload-action-button">
              <IoCloudUploadOutline />
              <span className="upload-action-button-text">
                Upload your meme
              </span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="modal-overlay" />
            <Dialog.Content className="modal-content">
              <Dialog.Title>Upload your meme</Dialog.Title>
              <Dialog.Description>
                If you have images you would like to add to the list, you can
                upload them here.
              </Dialog.Description>
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
              <div style={{ height: "16px" }}></div>
              <div className="modal-footer">
                <div className="modal-footer-button-container">
                  <Dialog.Close asChild>
                    <button className="modal-button cancel-button">
                      Cancel
                    </button>
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
      </div>
    </header>
  );
}
