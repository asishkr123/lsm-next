import { FunctionComponent } from "react";
import Sidebar from "./_components/Sidebar";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
