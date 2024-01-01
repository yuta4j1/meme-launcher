import { useState } from "react";
import "./Header.css";

export function Header() {
  const [searchKey, setSearchKey] = useState("");
  return (
    <header className="header-container">
      <input
        className="search-input"
        type="text"
        value={searchKey}
        placeholder="Search your feeling or meme..."
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </header>
  );
}
