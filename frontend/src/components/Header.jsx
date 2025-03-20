import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth(); // 🔹 Logout function bhi le liya
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#111827] shadow-md text-white fixed top-0 w-full md:px-12">
      <div className="flex items-center gap-2">
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? (
            <AiOutlineClose className="text-2xl" />
          ) : (
            <AiOutlineMenu className="text-2xl" />
          )}
        </button>
        <h1 className="text-2xl font-bold">Resume Analyser</h1>
      </div>

      {/* ✅ Navbar for Desktop */}
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-1 size-10 overflow-hidden rounded-full rounded-lg shadow-md">
              <img src={user.avatar.url} alt="profile_image" className="size-10 rounded-full"/>
              {/* <span>{user.username}</span> 🔹 User Name */}
            </div>
            <Button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 shadow-md"
            >
              <BiLogOut size={25}/>
            </Button>
          </div>
        ) : (
          <>
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-black rounded-lg shadow-md">
              <FaUser /> Login
            </Link>
            <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              Sign Up
            </Button>
          </>
        )}
      </div>

      {/* ✅ Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          <AiOutlineClose />
        </button>
        <div className="flex flex-col items-start p-6 gap-4 mt-10">
          {user ? (
            <>
              <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg w-full">
                <FaUser className="text-lg" />
                <span>{user.username}</span> {/* 🔹 User Name */}
              </div>
              <Button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 shadow-md w-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-black hover:bg-gray-300 shadow-md w-full">
                <FaUser /> Login
              </Button>
              <Button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 shadow-md w-full">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
