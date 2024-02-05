import IconButton from "@/components/shared/iconButton";
import MainContent from "@/components/shared/mainContent";
import Sidebar from "@/components/shared/sidebar";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function TasksLayout({ children }) {
  return (
    <div className="h-full overflow-hidden flex flex-row">
      <Sidebar
        title="Tasks"
        titleAction={
          <IconButton id="new_task" icon={<PlusIcon />} title="New Task" />
        }
      />
      <MainContent>{children}</MainContent>
    </div>
  );
}
