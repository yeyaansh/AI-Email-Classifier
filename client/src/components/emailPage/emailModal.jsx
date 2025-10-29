import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import getLabelColor from "./getLableColor";

// --- Email Modal Component ---
const EmailModal = ({ email, onClose }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsShowing(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsShowing(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby="email-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity duration-300 ease-in-out ${
          isShowing ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 ease-in-out ${
          isShowing ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b p-5">
          <h3
            className="text-xl font-semibold text-gray-900"
            id="email-modal-title"
          >
            {email.subject || "No Subject"}
          </h3>
          <button
            type="button"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={handleClose}
          >
            <span className="text-2xl font-light">&times;</span>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* --- MODIFIED: Modal Body --- */}
        {/* Added overflow-y-auto here to make the *body* scrollable, not the whole modal */}
        <div className="space-y-6 p-6 overflow-y-auto max-h-[70vh]">
          {/* Category */}
          {email.label && (
            <div className="flex items-center">
              <span className="w-24 shrink-0 text-sm font-medium text-gray-500">
                Category
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getLabelColor(
                  email.label
                )}`}
              >
                {email.label}
              </span>
            </div>
          )}

          {/* From */}
          <div className="flex">
            <span className="w-24 shrink-0 text-sm font-medium text-gray-500">
              From
            </span>
            <span className="text-base text-gray-800">{email.from}</span>
          </div>

          {/* Snippet */}
          <div>
            <span className="text-sm font-medium text-gray-500">Snippet</span>
            <div className="mt-2 rounded-md border bg-gray-50 p-3 text-base text-gray-600">
              <ReactMarkdown>{email.snippet}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
