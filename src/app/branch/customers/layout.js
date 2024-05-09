import IconButton from "@/components/shared/iconButton";
import MainContent from "@/components/shared/mainContent";
import Sidebar from "@/components/shared/sidebar";
import { PlusIcon } from "@heroicons/react/24/solid";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function TasksLayout({ children }) {
  const menuItems = [
    {
      text: "Inquiry",
      id: "inquiry",
      href: "/branch/customers",
      icon: <FaSearch />,
    },
    {
      text: "New Customer",
      id: "newCustomer",
      href: "/branch/customers/new",
      icon: <FaPlus />,
    },
  ];
  return (
    <div className="h-full overflow-hidden flex flex-row">
      <Sidebar
        menuItems={menuItems.map((m) => ({
          ...m,
        }))}
        title="Customers"
        titleAction={
          // <IconButton
          //   id="new_customer"
          //   icon={<PlusIcon />}
          //   title="New Customer"
          // />
          <></>
        }
      />
      <MainContent>{children}</MainContent>
    </div>
  );
}
