import { useEffect } from "react";

const UserDetailsPopup = ({ user, isOpen, onClose }) => {
  if (!user || !isOpen) return null;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={onClose}>✖</button>
        <h2 className="text-xl font-bold">Your Profile </h2>
        <p className="text-gray-400 text-sm">View Your information</p>

        <div className="flex flex-col items-center gap-4 mt-4">
          <img src={user.avatar.url} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-blue-500" />
          <div className="text-lg font-semibold">{user.username}</div>
          <p className="text-gray-400">{user.email}</p>
          <span className={`px-5 py-1 rounded-full text-sm ${user.role === "admin" ? "bg-red-500" : "bg-green-500"}`}>
            {user.role}
          </span>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
