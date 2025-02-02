import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DrawingProvider } from "./contexts/DrawingContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DrawingProvider>
      <App />
    </DrawingProvider>
  </React.StrictMode>
);
