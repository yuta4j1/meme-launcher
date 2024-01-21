import { useState, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import ImageList from "./components/ImageList";
import NotifierContextProvider from "./components/NotifierContextProvider";

function App() {
  const [categoryId, setCategoryId] = useState<string>("0");
  const handleCategoryChange = useCallback(
    (id: string) => {
      setCategoryId(id);
    },
    [setCategoryId]
  );
  return (
    <NotifierContextProvider>
      <Header
        selectedCategoryId={categoryId}
        handleCategoryChange={handleCategoryChange}
      />
      <main>
        <ImageList categoryId={categoryId} />
      </main>
    </NotifierContextProvider>
  );
}

export default App;
