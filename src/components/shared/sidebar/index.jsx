import React from "react";

const Sidebar = ({ title, titleAction, subtitle, menuItems }) => {
  return (
    <div
      className="h-full flex flex-col overflow-hidden p-2 w-[240px]"
      id="main_sidebar"
    >
      <div className="rounded-md border px-2 h-full shadow-md">
        {title && (
          <div className="sidebar-module-title py-4 px-2 border-b border-b-slate-200 flex flex-row items-center">
            <h2 className="text-xl grow font-bold text-sky-900">{title}</h2>
            {titleAction || <></>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
