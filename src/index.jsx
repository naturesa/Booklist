import React from "react";
import ReactDOM from "react-dom/client";  // Correct for React 18+
import App from "./App";
import { AuthProvider } from "./AuthContext";  // Ensure this path is correct
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
