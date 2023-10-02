import IconBadge from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { FunctionComponent } from "react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";

interface CoursePageProps {
  params: { courseId: string };
}

const CoursePage: FunctionComponent<CoursePageProps> = async ({ params }) => {
  const { courseId } = params;
  const { userId } = auth();
  if (!userId) return redirect("/");
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });
  if (!course) redirect("/");
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields = requiredFields.filter(Boolean).length;
  const completionText = `${totalFields}/${requiredFields.length}`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            {`Complete all fields ${completionText}`}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} size={"default"} />
            <h2>Customize your Course</h2>
          </div>
        </div>
      </div>
      <TitleForm initialData={course} courseId={course.id} />
      <DescriptionForm initialData={course} courseId={course.id} />
      <ImageForm initialData={course} courseId={course.id} />
    </div>
  );
};

export default CoursePage;
