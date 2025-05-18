import { db } from "~/server/db";

export default async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {images.map(image => (
        <div
          key={image.id}
          className="flex h-48 w-48 flex-col items-center justify-between"
        >
          <img src={image.url} alt={image.name} />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}
