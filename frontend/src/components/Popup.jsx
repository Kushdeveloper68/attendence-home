import React from "react";

export default function Popup({ show, type = "info", message = "", onClose }) {
  if (!show) return null;

  // Color styles based on type
  const color = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
  }[type] || "bg-gray-100 border-gray-300 text-gray-800";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className={`w-full max-w-xs sm:max-w-sm md:max-w-md border-l-4 rounded-lg shadow-lg p-5 ${color} relative animate-fade-in`}
      >
        <button
          className="absolute top-2 right-2 text-xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex items-center gap-3">
          {type === "success" && (
            <span className="text-2xl">✅</span>
          )}
          {type === "error" && (
            <span className="text-2xl">❌</span>
          )}
          {type === "info" && (
            <span className="text-2xl">ℹ️</span>
          )}
          {type === "warning" && (
            <span className="text-2xl">⚠️</span>
          )}
          <span className="font-semibold text-base">{message}</span>
        </div>
      </div>
    </div>
  );
}