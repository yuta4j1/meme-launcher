import { useState } from "react";
import useSWR from "swr";
import { getRequest } from "../../api";
import type { ImageListReponse } from "../../types/image";
import PreviewModal from "../PreviewModal";
import "./ImageList.css";

function ClickableImage(props: {
  id: string;
  url: string;
  altText: string;
  handleClick: (imageId: string) => void;
}) {
  const { id, url, altText, handleClick } = props;
  return (
    <button
      className="preview-button"
      aria-label="画像プレビューボタン"
      onClick={() => handleClick(id)}
    >
      <img src={url} width={270} height={180} alt={altText} />
    </button>
  );
}

export function ImageList() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewedImageId, setPreviewImageId] = useState("");
  const {
    data: imageList,
    isLoading,
    error,
  } = useSWR<ImageListReponse>("/images", getRequest);

  const handleImageClick = (imageId: string) => {
    setPreviewImageId(imageId);
    setIsPreviewOpen(true);
  };
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error: {error}</div>;
  }
  return (
    <div>
      {imageList && (
        <div className="images-container">
          {imageList.map((image) => (
            <ClickableImage
              key={image.id}
              id={String(image.id)}
              url={image.imageUrl}
              handleClick={handleImageClick}
              altText={""}
            />
          ))}
          <PreviewModal
            open={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            previewImage={
              imageList.find((img) => String(img.id) === previewedImageId) ??
              imageList[0]
            }
          />
        </div>
      )}
    </div>
  );
}
