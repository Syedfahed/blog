import React from "react";

const Input = ({ name, placeholder, isError = false, type, props }) => {
  return (
    <input
      // ref={innerRef}
      {...props}
      name={name}
      placeholder={placeholder}
      type={type}
      className={`border rounded-md p-2 block w-full ${
        isError ? "border-red-600" : "border-blue-500"
      }`}
    />
  );
};
export { Input };
