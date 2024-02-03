"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { UploadButton } from "@uploadthing/react";

 
 
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          console.log("error: ", error);
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}