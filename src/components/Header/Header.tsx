import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import "./Header.css";
import UploadModal from "../UploadModal";

export function Header() {
  const [searchKey, setSearchKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
        <button
          className="upload-action-button"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <IoCloudUploadOutline />
          <span className="upload-action-button-text">Upload your meme</span>
        </button>
      </div>
      <UploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}
