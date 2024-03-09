import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";

async function enableMocking() {
  if (import.meta.env.MODE !== "mock") {
    return;
  }
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
