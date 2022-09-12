import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { BrowserRouter as Router } from "react-router-dom";

const rootNode = document.getElementById("app");

if (rootNode) {
  createRoot(rootNode).render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
}
