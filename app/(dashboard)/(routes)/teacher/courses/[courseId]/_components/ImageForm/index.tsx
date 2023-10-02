"use client";
import { Course } from "@prisma/client";
import { FunctionComponent, useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ImageIcon, Pencil, PlusCircle, PlusIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ImageForm: FunctionComponent<ImageFormProps> = ({
  initialData,
  courseId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.patch(
        `/api/course/create/${courseId}`,
        values
      );
      toast.success("Course Updated Successfully", {
        position: "top-center",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!!!", {
        position: "top-center",
      });
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {!initialData?.imageUrl ? (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Image
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Image
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {!isEditing && !initialData?.imageUrl ? (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      ) : (
        <div className="relative aspect-video mt-2">
          <Image
            src={initialData.imageUrl || ""}
            alt="Upload"
            className="object-cover rounded-md"
            fill
          />
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            onChange={(url: string | undefined) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
            endpoint={"courseImage"}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 ascept radio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
