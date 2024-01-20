import { FC, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import styles from "./Header.module.css";
import UploadModal from "../UploadModal";
import FilterSelector from "../FilterSelector";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const Header: FC<{
  selectedCategoryId: string;
  handleCategoryChange: (id: string) => void;
}> = ({ selectedCategoryId, handleCategoryChange }) => {
  const [searchKey, setSearchKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.searchIcon}>
        <MagnifyingGlassIcon width="24" height="24" />
      </div>
      <input
        className={styles.searchInput}
        type="text"
        value={searchKey}
        placeholder="キーワードを入力して検索"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <div className={styles.headerMenuContainer}>
        <FilterSelector
          categoryId={selectedCategoryId}
          handleCategoryChange={handleCategoryChange}
        />
        <button
          className={styles.uploadActionButton}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <IoCloudUploadOutline />
          <span className={styles.uploadActionButtonText}>画像を追加する</span>
        </button>
      </div>
      <UploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};
