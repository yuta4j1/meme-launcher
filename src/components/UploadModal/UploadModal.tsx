import { FC, useRef, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import CategorySelector from "../CategorySelector";
import { keywordIdGen } from "../../util/random";
import { cx } from "../../util/classNames";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineFaceSmile, HiOutlineTag } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { ImageIcon, Cross1Icon } from "@radix-ui/react-icons";
import { putObject } from "../../storage/client";
import { postRequest } from "../../api";
import { useImageList } from "../../hooks/useImageList";
import { useDispatchNotifierState } from "../../hooks/useDispatchNotifierState";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { uploadFileSchema, UploadFileForm } from "./formSchema";
import type { CreateImageParam } from "../../types/image";
import styles from "./UploadModal.module.css";

export const UploadModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<UploadFileForm>({
    defaultValues: {
      file: undefined,
      categoryId: "",
      keywords: [{ id: keywordIdGen(), value: "" }],
    },
    resolver: valibotResolver(uploadFileSchema),
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });

  const file = watch("file");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { mutate } = useImageList();
  const dispatchNotifierState = useDispatchNotifierState();

  const onSubmit: SubmitHandler<UploadFileForm> = async (data) => {
    if (!isValid) {
      return;
    }
    try {
      const imageUrl = await putObject(data.file);
      await postRequest<CreateImageParam, {}>("/images", {
        imageUrl,
        categoryId: Number(data.categoryId),
        tagList: data.keywords.map((it) => it.value),
      });
      mutate();
      onClose();
      dispatchNotifierState({
        show: true,
        type: "success",
        message: "画像のアップロードが完了しました",
      });
    } catch (err) {
      console.error(err);
      dispatchNotifierState({
        show: true,
        type: "error",
        message: "画像のアップロードが完了しました",
      });
    }
  };

  const objectUrl = useMemo(() => {
    return file === undefined ? undefined : URL.createObjectURL(file);
  }, [file]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        // フォームのステート初期化
        reset();
        if (objectUrl !== undefined) {
          URL.revokeObjectURL(objectUrl);
        }
        onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalOverlay} />
        <Dialog.Content
          className={cx(styles.modalContent, styles.modalContentHeight)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.modalHeader}>
              <Dialog.Title>画像を追加する</Dialog.Title>
              <Dialog.Description>
                <span className={styles.modalDescription}>
                  {"😸 > あなたの素敵なミーム画像をアップロードしましょう！"}
                </span>
              </Dialog.Description>
              <button
                className={styles.modalCloseButton}
                onClick={() => {
                  onClose();
                }}
              >
                <Cross1Icon width={24} height={24} />
              </button>
            </div>
            <div className={styles.formContent}>
              <div className={styles.leftContent}>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/png,image/jpeg"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      const file = files.item(0);
                      if (file !== null) {
                        setValue("file", file);
                      }
                    }
                  }}
                  ref={fileRef}
                />
                <div className={styles.uploadContainer}>
                  <div className={styles.droppableArea}>
                    {file === undefined && (
                      <div className={styles.fileInputMessage}>
                        <ImageIcon />
                        <button
                          type="button"
                          className={styles.fileInputAreaButton}
                          onClick={() => {
                            fileRef.current?.click();
                          }}
                        >
                          このあたりをクリックしてファイルを選択してください
                        </button>
                      </div>
                    )}
                    {file !== undefined && (
                      <div className={styles.previewImageContainer}>
                        <button
                          className={styles.deletePreviewImage}
                          onClick={(e) => {
                            e.preventDefault();
                            setValue("file", undefined as unknown as Blob);
                            if (objectUrl !== undefined) {
                              URL.revokeObjectURL(objectUrl);
                            }
                          }}
                        >
                          <RxCross1 />
                        </button>
                        <img
                          className={styles.previewImage}
                          src={objectUrl}
                          width="100%"
                          height="300"
                        />
                      </div>
                    )}
                  </div>
                  {errors.file && (
                    <p className={styles.errorMessage}>{errors.file.message}</p>
                  )}
                </div>
              </div>
              <div className={styles.rightContent}>
                <section>
                  <h3 className={styles.h3WithIcon}>
                    <HiOutlineFaceSmile size={24} />
                    画像に合う絵文字を選択
                  </h3>
                  <div>
                    <CategorySelector control={control} />
                    {errors.categoryId && (
                      <p className={styles.errorMessage}>
                        {errors.categoryId?.message}
                      </p>
                    )}
                  </div>
                </section>
                <div style={{ height: "32px" }}></div>
                <section>
                  <h3 className={styles.h3WithIcon}>
                    <HiOutlineTag size={24} />
                    設定したいタグを入力
                  </h3>
                  <div className={styles.keywordInputContainer}>
                    <div className={styles.inputRowsContainer}>
                      {fields.map((field, idx) => (
                        <div key={field.id}>
                          <div className={styles.inputRow}>
                            <input
                              type="text"
                              className={styles.keywordInput}
                              {...register(`keywords.${idx}.value`)}
                            />

                            <button
                              className={styles.deleteRowButton}
                              onClick={(e) => {
                                e.preventDefault();
                                remove(idx);
                              }}
                            >
                              <RxCross1 />
                            </button>
                          </div>
                          {errors.keywords && errors.keywords[idx] && (
                            <p className={styles.errorMessage}>
                              {errors.keywords[idx]?.value?.message}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className={styles.plusButtonContainer}>
                      <button
                        className={styles.plusButton}
                        onClick={(e) => {
                          e.preventDefault();
                          append({ id: keywordIdGen(), value: "" });
                        }}
                      >
                        <FiPlus size={16} />
                        <span className={styles.plusButtonText}>
                          タグを追加
                        </span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div style={{ height: "16px" }}></div>
            <div className={styles.modalFooter}>
              <div className={styles.modalFooterButtonContainer}>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className={cx(styles.modalButton, styles.cancelButton)}
                  >
                    キャンセル
                  </button>
                </Dialog.Close>
                <button
                  className={cx(styles.modalButton, styles.uploadButton)}
                  disabled={false}
                >
                  {isSubmitting ? (
                    <div className={styles.loader}>
                      <AiOutlineLoading3Quarters />
                    </div>
                  ) : (
                    <IoCloudUploadOutline />
                  )}
                  <span className={styles.uploadButtonText}>アップロード</span>
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
