"use client";
import { Compass, Layout } from "lucide-react";
import { FunctionComponent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
interface SidebarRoutesProps {}

const routes = [
  {
    name: "Dashboard",
    icon: Layout,
    href: "/",
  },
  {
    icon: Compass,
    name: "Browse",
    href: "/search",
  },
];

const SidebarRoutes: FunctionComponent<SidebarRoutesProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <div className="flex flex-col w-full">
      {routes.map(({ href, icon: Icon, name }) => {
        const isActive =
          (pathname === "/" && href === "/") ||
          pathname === href ||
          pathname?.startsWith(`${href}/`);
        return (
          <button
            className={cn(
              "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
              isActive &&
                "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            )}
            key={href}
            onClick={() => onClick(href)}
          >
            <div className="flex items-center gap-x-2 py-4">
              <Icon
                size={22}
                className={cn("text-slate-500", isActive && "text-sky-500")}
              />
              {name}
            </div>
            <div
              className={cn(
                "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                isActive && "opacity-100"
              )}
            ></div>
          </button>
        );
      })}
    </div>
  );
};

export default SidebarRoutes;
