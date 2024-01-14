import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./Header.css";
import UploadModal from "../UploadModal";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function Header() {
  const [searchKey, setSearchKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="header-container">
      {/** TODO: 虫眼鏡アイコン入れたい */}
      <div className="search-icon">
        <MagnifyingGlassIcon width="24" height="24" />
      </div>
      <input
        className="search-input"
        type="text"
        value={searchKey}
        placeholder="キーワードを入力して検索"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <div className="header-menu-container">
        <button
          className="upload-action-button"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <IoCloudUploadOutline />
          <span className="upload-action-button-text">画像を追加する</span>
        </button>
      </div>
      <UploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}
