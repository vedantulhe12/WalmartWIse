import React from "react";

const UserMenu = ({ user, logout }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">{user.name}</span>
      <img
        src={user.picture}
        alt="Profile"
        className="w-8 h-8 rounded-full border border-white"
      />
      <button
        onClick={logout}
        className="bg-red-500 text-white px-3 py-1 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
