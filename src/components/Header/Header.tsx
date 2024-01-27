import { FC } from "react";
import styles from "./Header.module.css";
import FilterSelector from "../FilterSelector";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import PopoverMenu from "../PopoverMenu";

export const Header: FC<{
  searchKeyword: string;
  handleKeywordChange: (value: string) => void;
  selectedCategoryId: string;
  handleCategoryChange: (id: string) => void;
}> = ({
  searchKeyword,
  handleKeywordChange,
  selectedCategoryId,
  handleCategoryChange,
}) => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.searchIcon}>
        <MagnifyingGlassIcon width="24" height="24" />
      </div>
      <input
        className={styles.searchInput}
        type="text"
        value={searchKeyword}
        placeholder="キーワードを入力して検索"
        onChange={(e) => handleKeywordChange(e.target.value)}
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
