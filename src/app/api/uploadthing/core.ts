import { auth } from "@clerk/nextjs/server";
import { toast } from "sonner";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      const user = await auth();
      if (!user.userId) {
        throw new UploadThingError("Unauthorized") as Error;
      }

      const { success } = await ratelimit.limit(user.userId);
      if (!success) throw new Error("Rate limit reached.");

      return { userId: user.userId };
    })
    .onUploadError(()  => {
      toast.error("Upload failed");
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(images).values({
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
