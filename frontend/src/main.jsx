import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#1a1a2e",
          color: "#e2e8f0",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          borderRadius: "12px",
          padding: "14px 18px",
          fontSize: "14px",
          fontFamily: "inherit",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1)",
          maxWidth: "360px",
        },
        success: {
          style: {
            background: "#0f2027",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            color: "#d1fae5",
          },
          iconTheme: { primary: "#34d399", secondary: "#0f2027" },
        },
        error: {
          style: {
            background: "#1c0a0a",
            border: "1px solid rgba(248, 113, 113, 0.4)",
            color: "#fee2e2",
          },
          iconTheme: { primary: "#f87171", secondary: "#1c0a0a" },
        },
      }}
    />
  </>
);
