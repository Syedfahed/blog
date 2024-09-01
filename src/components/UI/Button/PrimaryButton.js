const PrimaryButton = ({ onClick, text, type, size='w-full', className }) => {
  return (
    <button
      className={`bg-blue-700 text-white p-3 text-sm font-medium rounded-md ${
        size || className
      }`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
export { PrimaryButton };
