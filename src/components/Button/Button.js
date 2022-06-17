import React from "react";

const Button = ({ children, className, full = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-semibold text-white rounded-lg bg-primary ${
        full ? "w-full" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
