import React from "react";

const LoadingEmailsSkeleton = () => {
  return (
    <div
      // We keep all layout, border, shadow, and padding classes from the original
      // to ensure the skeleton occupies the exact same space.
      // We remove interactive classes (hover:, onClick) and add 'animate-pulse'.
      className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
    >
      <div className="animate-pulse">
        {/* Top section: Sender and Label */}
        <div className="flex gap-2 justify-between items-center mb-2">
          {/* Sender placeholder */}
          <div className="h-5 bg-gray-300 rounded-md w-2/5"></div>

          {/* Label placeholder */}
          {/* We render this placeholder to prevent layout shift,
              even though the original label is conditional. */}
          <div className="h-4 bg-gray-300 rounded-full w-20"></div>
        </div>

        {/* Body snippet placeholder (simulating 2 lines) */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded-md w-full"></div>
          <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingEmailsSkeleton;
