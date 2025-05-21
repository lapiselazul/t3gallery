import { getImage } from "~/server/queries";

export default async function FullPageImageView({ id }: { id: number }) {
  const image = await getImage(id);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-1 items-center justify-center min-w-0">
        <img src={image.url} className="object-contain max-w-full max-h-full" alt={image.name} />
      </div>

      <div className="flex flex-col w-96 shrink-0 border-l">
        <div className="border-b text-center text-lg">{image.name}</div>
      </div>
    </div>
  );
}
