"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "../_utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TopNav() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Image Gallery</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <p>Sign in to start uploading images.</p>
          <SignInButton>
            <button
              type="button"
              className="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onUploadBegin={() => {
              toast("Uploading...", { 
                duration: 10000,
                id: "upload-begin",
              });
            }}
            onClientUploadComplete={() => {
              toast.dismiss("upload-begin");
              toast("Upload complete!", { duration: 3000 });
              router.refresh();
            }}
          />
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
