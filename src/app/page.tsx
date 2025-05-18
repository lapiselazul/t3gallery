import { db } from "~/server/db";

export const dynamic = "force-dynamic";
 
export default async function HomePage() {

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        
        {
          images.map((image, i) => (
            <div key={image.id + '-' + i} className="flex flex-col w-48 items-center justify-between">
              <img src={image.url} alt={image.name} />
              <div>{image.name}</div>
            </div>
          ))
        }</div>
    </main>
  );
}
