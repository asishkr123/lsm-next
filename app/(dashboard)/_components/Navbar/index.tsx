import { FunctionComponent } from "react";
import MobileSidebar from "../MobileSidebar";
import NavbarRoutes from "../NavbarRoutes";
interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
