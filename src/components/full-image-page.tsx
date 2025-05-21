import { auth, clerkClient } from "@clerk/nextjs/server";
import Trash from "~/app/_components/trash";
import { deleteImage, getImage } from "~/server/queries";

export default async function FullPageImageView({ id }: { id: number }) {
  const image = await getImage(id);
  const client = await clerkClient();
  const imageUser = await client.users.getUser(image.userId);
  const loggedUser = await auth();

  return (
    <div className="flex h-full w-full">
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
          <span>{imageUser.fullName}</span>
        </div>
        <div className="flex flex-col p-4">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        {loggedUser?.userId === image?.userId && (
          <div className="p-4">
            <form
              action={async () => {
                "use server";

                await deleteImage(id);
              }}
            >
              <button
                type="submit"
                className="me-2 mb-2 flex items-center gap-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <Trash /> Delete Image
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
