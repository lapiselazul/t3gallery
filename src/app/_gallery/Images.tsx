import { db } from "~/server/db";

export default async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {images.length === 0 && <p>Thank you for visiting, but the images are in another castle.</p>}
      {images.length > 0 &&
        images.map((image) => (
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
