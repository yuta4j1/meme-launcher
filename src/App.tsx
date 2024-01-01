import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Header from "./components/Header";
import ImageList from "./components/ImageList";

function App() {
  return (
    <div>
      <Header />
      <main>
        <ImageList />
      </main>
    </div>
  );
}

export default App;
