"use client";

import { UploadDropzone } from "@/lib/uploadThing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { FunctionComponent } from "react";
import { UploadFileResponse } from "uploadthing/client";
import { toast } from "react-toastify";

interface FileUploadProps {
  onChange: (url: string | undefined) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUpload: FunctionComponent<FileUploadProps> = ({
  onChange,
  endpoint,
}) => {
  return (
    <UploadDropzone
      onClientUploadComplete={(res: UploadFileResponse[] | undefined) => {
        onChange(res?.[0]?.url);
      }}
      endpoint={endpoint}
      onUploadError={(error: Error) => {
        toast.error("something went wrong!!");
      }}
    />
  );
};

export default FileUpload;
