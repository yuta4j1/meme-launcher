import { useState, useCallback } from "react";
import Header from "./components/Header";
import ImageList from "./components/ImageList";
import NotifierContextProvider from "./components/NotifierContextProvider";
import { useScrollDirection } from "./hooks/useScrollDirection";

function App() {
  const [categoryId, setCategoryId] = useState<string>("0");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { direction } = useScrollDirection();

  const handleCategoryChange = useCallback(
    (id: string) => {
      setCategoryId(id);
    },
    [setCategoryId]
  );

  return (
    <NotifierContextProvider>
      <Header
        searchKeyword={searchKeyword}
        handleKeywordChange={(value) => setSearchKeyword(value)}
        selectedCategoryId={categoryId}
        handleCategoryChange={handleCategoryChange}
        isScrollUp={direction === "up"}
      />
      <main>
        <ImageList searchKeyword={searchKeyword} categoryId={categoryId} />
      </main>
    </NotifierContextProvider>
  );
}

export default App;
