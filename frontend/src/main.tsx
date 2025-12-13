// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConteudoProvider } from "./contexts/ConteudoContext"; // 👈 ADICIONE ESTA LINHA

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConteudoProvider> {/* 👈 ENVOLVA O <App /> */}
      <App />
    </ConteudoProvider>
  </React.StrictMode>
);