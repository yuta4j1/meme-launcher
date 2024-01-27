import { FC, useState, useCallback, useMemo } from "react";
import { useImageList } from "../../hooks/useImageList";
import { useCategories } from "../../hooks/useCategories";
import type { Image } from "../../types/image";
import PreviewModal from "../PreviewModal";
import styles from "./ImageList.module.css";

function ClickableImage(props: {
  id: string;
  url: string;
  altText: string;
  handleClick: (image: Image) => void;
}) {
  const { id, url, altText, handleClick } = props;
  return (
    <button
      className={styles.previewButton}
      aria-label="画像プレビューボタン"
      onClick={() =>
        handleClick({
          id: Number(id),
          imageUrl: url,
          categoryId: 0,
          tagList: [],
        })
      }
    >
      <img
        className={styles.image}
        src={url}
        width={270}
        height={180}
        alt={altText}
      />
    </button>
  );
}

const ImagesGrid: FC<{
  imageList: Image[];
  handleImageClick: (image: Image) => void;
}> = ({ imageList, handleImageClick }) => {
  return (
    <div className={styles.imagesGrid}>
      {imageList.map((image) => (
        <ClickableImage
          key={image.id}
          id={String(image.id)}
          url={image.imageUrl}
          handleClick={handleImageClick}
          altText={""}
        />
      ))}
    </div>
  );
};

export const ImageList: FC<{ categoryId: string; searchKeyword: string }> = ({
  categoryId,
  searchKeyword,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewedImage, setPreviewImage] = useState<Image>();
  const { data: imageListByCategories, isLoading, error } = useImageList();

  const { data: categories, showData: showCategories } = useCategories();

  const showAll = categoryId === "0";

  const filteredImagesByCategory = useMemo(() => {
    if (imageListByCategories === undefined) {
      return [];
    }
    const images = imageListByCategories
      ?.filter((c) => String(c.categoryId) === categoryId)
      .flatMap((it) => it.images);
    if (searchKeyword === "") {
      return images;
    } else {
      return images.filter((image) =>
        image.tagList.some((tag) => tag.includes(searchKeyword))
      );
    }
  }, [categoryId, imageListByCategories, searchKeyword]);

  const filteredAllCategoriesImages = useMemo(() => {
    if (imageListByCategories === undefined) {
      return [];
    }
    if (searchKeyword === "") {
      return imageListByCategories;
    }

    return imageListByCategories
      .map((category) => ({
        categoryId: category.categoryId,
        images: category.images.filter((image) =>
          image.tagList.some((tag) => tag.includes(searchKeyword))
        ),
      }))
      .filter((category) => category.images.length > 0);
  }, [imageListByCategories, searchKeyword]);

  const categoryLabel = useCallback(
    (categoryId: number): string => {
      if (!showCategories) {
        return "";
      }
      const category = categories?.find((it) => it.id === categoryId);
      if (category) {
        return `${category.emoji} ${category.name}`;
      }
      return "";
    },
    [categories, showCategories]
  );

  const handleImageClick = (image: Image) => {
    setPreviewImage(image);
    setIsPreviewOpen(true);
  };
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error: {error}</div>;
  }
  return (
    <div className={styles.imagesContainer}>
      {showAll &&
        imageListByCategories &&
        filteredAllCategoriesImages?.map((c) => (
          <div key={c.categoryId}>
            <div className={styles.categoryLabel}>
              {categoryLabel(c.categoryId)}
            </div>
            <ImagesGrid
              imageList={c.images}
              handleImageClick={handleImageClick}
            />
          </div>
        ))}
      {filteredImagesByCategory && (
        <ImagesGrid
          imageList={filteredImagesByCategory}
          handleImageClick={handleImageClick}
        />
      )}
      {previewedImage && (
        <PreviewModal
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          previewImage={previewedImage}
        />
      )}
    </div>
  );
};
