import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView({ id }: { id: number }) {
  const image = await getImage(id);
  const client = await clerkClient();
  const user = await client.users.getUser(image.userId);

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
          <span>{user.fullName}</span>
        </div>
        <div className="flex flex-col p-4">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
