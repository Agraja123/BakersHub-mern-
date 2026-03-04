import toast from "react-hot-toast";

const base = {
  style: {
    background: "#1a1a2e",
    color: "#e2e8f0",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    maxWidth: "360px",
  },
};

export const toastSuccess = (msg) =>
  toast.success(msg, {
    ...base,
    style: {
      ...base.style,
      background: "#0f2027",
      border: "1px solid rgba(52, 211, 153, 0.45)",
      color: "#d1fae5",
    },
    iconTheme: { primary: "#34d399", secondary: "#0f2027" },
  });

export const toastError = (msg) =>
  toast.error(msg, {
    ...base,
    style: {
      ...base.style,
      background: "#1c0a0a",
      border: "1px solid rgba(248, 113, 113, 0.45)",
      color: "#fee2e2",
    },
    iconTheme: { primary: "#f87171", secondary: "#1c0a0a" },
  });

export const toastInfo = (msg) =>
  toast(msg, {
    ...base,
    icon: "ℹ️",
    style: {
      ...base.style,
      background: "#0d1b2a",
      border: "1px solid rgba(96, 165, 250, 0.45)",
      color: "#dbeafe",
    },
  });

export const toastWarning = (msg) =>
  toast(msg, {
    ...base,
    icon: "⚠️",
    style: {
      ...base.style,
      background: "#1c1300",
      border: "1px solid rgba(251, 191, 36, 0.45)",
      color: "#fef3c7",
    },
  });
