import IconButton from "@/components/iconButton";
import MainContent from "@/components/mainContent";
import Sidebar from "@/components/sidebar";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function TasksLayout({ children }) {
  return (
    <div className="h-full overflow-hidden flex flex-row">
      <Sidebar
        title="Tasks"
        titleAction={<IconButton icon={<PlusIcon />} title="New Task" />}
      />
      <MainContent>{children}</MainContent>
    </div>
  );
}
