import {
  FC,
  useState,
  useRef,
  useMemo,
  useCallback,
  MouseEventHandler,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoCloudUploadOutline } from "react-icons/io5";
import CategorySelector from "../CategorySelector";
import { keywordIdGen } from "../../util/random";
import { RxCross1 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { putObject } from "../../r2";
import { createBlobMd5 } from "../../util/md5";
import { postRequest } from "../../api";
import type { CreateImageParam } from "../../types/image";
import "./UploadModal.css";

type Keyword = {
  id: string;
  value: string;
};

type CategoryId = string;

export const UploadModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([
    { id: keywordIdGen(), value: "" },
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>("");
  const [isUploading, setIsUploading] = useState(false);

  const initializeState = useCallback(() => {
    setUploadFile(null);
    setKeywords([{ id: keywordIdGen(), value: "" }]);
    setSelectedCategoryId("");
  }, [setUploadFile, setKeywords, setSelectedCategoryId]);

  const uploadFileUrl = useMemo(() => {
    if (!uploadFile) return null;
    return URL.createObjectURL(uploadFile);
  }, [uploadFile]);

  const onUploadClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    // TODO: 登録後UIインタラクション
    async () => {
      // TODO: Enterキーに反応しなくなりそうなので対策したい
      // e.preventDefault();
      setIsUploading(true);
      // TODO: validation
      if (uploadFile === null) return;
      try {
        const bucketKey = await createBlobMd5(uploadFile);
        const imageUrl = await putObject(bucketKey, uploadFile);

        const res = await postRequest<CreateImageParam, {}>("/images", {
          imageUrl,
          categoryId: Number(selectedCategoryId),
          tagList: keywords
            .map((keyword) => keyword.value)
            .filter((it) => it !== ""),
        });
        console.log(res);
        initializeState();
        onClose();
      } catch (e) {
        console.error(e);
      }
      setIsUploading(false);
    },
    [uploadFile, selectedCategoryId, keywords, onClose]
  );

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        // ステートの初期化
        initializeState();
        onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <div className="loader-conatiner"></div>
        <Dialog.Content className="modal-content">
          <div className="modal-header">
            <Dialog.Title>画像を追加する</Dialog.Title>
            <Dialog.Description>
              あなたの素敵なミーム画像を追加しましょう！
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
              <h2>画像に合う絵文字を選択</h2>
              <div>
                <CategorySelector
                  categoryId={selectedCategoryId}
                  changeHandler={(v) => setSelectedCategoryId(v)}
                />
              </div>
            </section>
            <div style={{ height: "32px" }}></div>
            <section>
              <h2>追加したいタグを入力</h2>
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
                  <span className="plus-button-text">タグを増やす</span>
                </button>
              </div>
            </section>
          </div>
          <div style={{ height: "16px" }}></div>
          <div className="modal-footer">
            <div className="modal-footer-button-container">
              <Dialog.Close asChild>
                <button className="modal-button cancel-button">
                  キャンセル
                </button>
              </Dialog.Close>
              <button
                className="modal-button upload-button"
                onClick={onUploadClick}
                disabled={isUploading}
              >
                <IoCloudUploadOutline />
                <span className="upload-button-text">アップロード</span>
              </button>
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
