import { getImage } from "~/server/queries";

export default async function FullPageImageView({ id }: { id: number }) {
  const image = await getImage(id);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex shrink justify-center items-center">
      <img src={image.url} className="h-auto object-contain flex shrink" />
      </div>

      <div className="w-48 flex flex-col shrink-0 border-l">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
