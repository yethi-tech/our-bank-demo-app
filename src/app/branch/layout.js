import AppBar from "@/components/shared/topbar";
import { FaFile, FaList, FaMoneyBill, FaUsers } from "react-icons/fa";
const menuItems = [
  {
    text: "Customers",
    id: "customers",
    href: "/branch/customers",
    icon: <FaUsers />,
  },
  {
    text: "Tasks",
    id: "tasks",
    icon: <FaList />,
    href: "/branch/tasks",
  },
  {
    text: "Accounts",
    id: "accounts",
    href: "/branch/accounts",
    icon: <FaFile />,
  },
  {
    text: "Transactions",
    id: "transactions",
    href: "/branch/transactions",
    icon: <FaMoneyBill />,
  },
];

export default function BranchLayout({ children }) {
  return (
    <div className="inner-layout-main branch-layout">
      <AppBar navItems={menuItems} />
      <div className="main">{children}</div>
    </div>
  );
}
