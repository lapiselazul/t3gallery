import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView({ id }: { id: number }) {
  const image = await getImage(id);
  const client = await clerkClient();
  const user = await client.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-1 items-center justify-center min-w-0">
        <img src={image.url} className="object-contain max-w-full max-h-full" alt={image.name} />
      </div>

      <div className="flex flex-col w-96 shrink-0 border-l">
        <div className="border-b text-center text-lg p-2">{image.name.toUpperCase()}</div>

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
