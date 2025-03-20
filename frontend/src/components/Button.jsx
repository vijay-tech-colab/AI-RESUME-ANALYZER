export default function Button({ children, onClick, disabled, className }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg bg-blue-600 hover:bg-blue-700 ${className}`}
      >
        {children}
      </button>
    );
  }
  