import { FC, useState } from "react";
import styles from "./Header.module.css";
import FilterSelector from "../FilterSelector";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import PopoverMenu from "../PopoverMenu";

export const Header: FC<{
  selectedCategoryId: string;
  handleCategoryChange: (id: string) => void;
}> = ({ selectedCategoryId, handleCategoryChange }) => {
  const [searchKey, setSearchKey] = useState("");

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
        <PopoverMenu />
      </div>
    </header>
  );
};
