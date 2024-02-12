"use client";
import clsx from "clsx";
import Link from "next/link";

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
        <div className="sidebar-module-menu py-4 px-2 flex flex-col gap-1">
          {menuItems &&
            menuItems.map((item) => {
              const { id, href, icon, text, active } = item;
              return (
                <Link
                  key={id}
                  className={clsx(
                    "relative flex items-center rounded-md  text-sm px-3 py-2 font-semibold",
                    {
                      "bg-white hover:bg-gray-100 text-tenjin-primary": !active,
                    },
                    {
                      "bg-tenjin-info hover:bg-tenjin-info-light text-slate-600":
                        active,
                    }
                  )}
                  href={href}
                >
                  {icon && <span className="button-icon mr-4">{icon}</span>}
                  {text}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
