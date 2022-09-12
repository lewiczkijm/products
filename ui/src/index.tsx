import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/js/bootstrap.bundle.min";

const rootNode = document.getElementById("app");
const queryClient = new QueryClient();
if (rootNode) {
  createRoot(rootNode).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
