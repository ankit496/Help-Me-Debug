"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function ToastProvider({ children }) {
  const contextClass = {
    success: "bg-gradient-to-br from-blue-500 to-blue-700 border-blue-800",
    error: "bg-gradient-to-br from-red-500 to-red-700 border-red-800",
    info: "bg-gradient-to-br from-gray-500 to-gray-700 border-gray-800",
    warning: "bg-gradient-to-br from-orange-500 to-orange-700 border-orange-800",
    default: "bg-gradient-to-br from-indigo-500 to-indigo-700 border-indigo-800",
    dark: "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200", // Updated for dark mode
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          `${contextClass[context?.type || "default"]} relative flex p-4 min-h-10 rounded-lg justify-between overflow-hidden cursor-pointer shadow-xl border-l-4 transition-transform transform hover:scale-105`
        }
        bodyClassName={() =>
          "text-sm font-medium text-white"
        }
        position="bottom-left"
        autoClose={3000}
        closeButton={false} // You can add a close button if needed
        draggable
        pauseOnHover
      />
    </>
  );
}
