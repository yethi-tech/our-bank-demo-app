import {
  UsersIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { cloneElement } from "react";

const menuItems = [
  {
    text: "Customers",
    id: "customers",
    href: "/customers",
    icon: <UsersIcon />,
  },
  { text: "Tasks", id: "tasks", icon: <ListBulletIcon />, href: "/tasks" },
  {
    text: "Accounts",
    id: "accounts",
    href: "/accounts",
    icon: <ClipboardDocumentListIcon />,
  },
  {
    text: "Transactions",
    id: "transactions",
    href: "/transactions",
    icon: <BanknotesIcon />,
  },
];

export default function Home() {
  return (
    <main id="wrapper" className="flex min-h-full flex-col items-center">
      <div className="container mx-auto">
        <div
          className="app-title flex flex-row items-center justify-center pt-8"
          id="app-title"
        >
          <h1 className="text-lg font-semibold">OurBank</h1>
        </div>
        <div
          className="app-subtitle flex flex-row items-center justify-center pt-2"
          id="app-subtitle"
        >
          <h1 className="text-sm">Banking Platform</h1>
        </div>
        <div className="py-6 flex flex-row justify-center" id="menu-item-group">
          {menuItems.map((m) => (
            <div
              key={m.id}
              id={`menu_${m.id}`}
              className="menu-card p-4 m-3 w-[240px] h-[120px] border-2 flex flex-col items-center justify-center border-gray-400 bg-gray-100 rounded-md"
            >
              <div className="flex flex-row items-center justify-center icon mb-2">
                {cloneElement(m.icon, { className: "w-12 h-12" })}
              </div>
              <div className="flex flex-row items-center justify-center menu-item-title">
                <p className="font-semibold text-blue-800">
                  <Link href={m.href}>{m.text}</Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
