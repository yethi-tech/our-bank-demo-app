import AppBar from "@/components/shared/topbar";

export default function BranchLayout({ children }) {
  return (
    <div className="inner-layout-main branch-layout">
      <AppBar />
      <div className="main">{children}</div>
    </div>
  );
}
