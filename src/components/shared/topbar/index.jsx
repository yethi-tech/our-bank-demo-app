"use client";

import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";
import UserAvatar from "./UserAvatar";

const AppBar = ({ navItems }) => {
  const onSignOut = () => {
    signOut();
  };
  return (
    <nav className="bg-white drop-shadow-md" id="tjn_navbar">
      <div
        className="w-screen px-2 sm:px-6 lg:px-8 h-12 flex items-center"
        id="tjn_navbar_content"
      >
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <p className="text-tenjin-primary uppercase font-semibold">
              OurBank
            </p>
          </div>
          <div
            id="tjn_navbar_items"
            className="mx-4 flex items-center flex-grow"
          >
            {navItems.map((n) => (
              <MenuItem key={n.text} item={n} />
            ))}
          </div>
          <div id="tjn_navbar_right" className="flex items-center">
            <UserAvatar onSignOut={onSignOut} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
