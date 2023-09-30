"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

interface NavbarRoutesProps {}

const NavbarRoutes: FunctionComponent<NavbarRoutesProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.includes("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant={"ghost"}>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant={"ghost"}>
            Teacher
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default NavbarRoutes;
