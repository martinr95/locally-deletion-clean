export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-all duration-200 shadow-md
        ${disabled ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
    >
      {children}
    </button>
  );
}
