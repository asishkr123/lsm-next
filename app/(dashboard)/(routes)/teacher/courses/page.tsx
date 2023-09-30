import Link from "next/link";
import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
interface CoursesProps {}

const Courses: FunctionComponent<CoursesProps> = () => {
  return (
    <div className="p-6">
      <Link href={"courses/create"}>
        <Button>New Course</Button>
      </Link>
    </div>
  );
};

export default Courses;
