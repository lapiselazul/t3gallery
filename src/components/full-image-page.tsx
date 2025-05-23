import { auth, clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "~/components/ui/button";

export default async function FullPageImageView({ id }: { id: number }) {
  const image = await getImage(id);
  const client = await clerkClient();
  const imgOwner = await client.users.getUser(image.userId);

  const currentUser = await auth();

  return (
    <div className="full-img-container flex h-full w-full">
      <div className="flex min-w-0 flex-1 items-center justify-center">
        <img
          src={image.url}
          className="max-h-full max-w-full object-contain"
          alt={image.name}
        />
      </div>

      <div className="flex w-96 shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">
          {image.name.toUpperCase()}
        </div>

        <div className="flex flex-col p-4">
          <span>Uploaded By:</span>
          <span>{imgOwner.fullName}</span>
        </div>
        <div className="flex flex-col p-4">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        {currentUser?.userId === image.userId && (
          <div className="p-4">
            <form
              action={async () => {
                "use server";
                await deleteImage(id);
              }}
            >
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
