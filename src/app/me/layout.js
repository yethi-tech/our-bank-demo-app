import AppBar from "@/components/shared/topbar";
import { getServerSession } from "next-auth";
import { FaFile, FaList, FaMoneyBill, FaUsers } from "react-icons/fa";
import { authOptions } from "../api/auth/[...nextauth]/route";
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

export default async function BranchLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="inner-layout-main branch-layout">
      <AppBar navItems={menuItems} user={session.user} />
      <div className="main">{children}</div>
    </div>
  );
}
