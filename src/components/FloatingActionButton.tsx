import React from "react";

export const FloatingActionButton: React.FC<{
  onClick: () => void;
  ariaLabel?: string;
}> = ({ onClick, ariaLabel = "New project" }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="fixed bottom-6 right-6 z-50 md:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
};
export default FloatingActionButton;
