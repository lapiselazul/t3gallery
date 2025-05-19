import { getUserImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function Images() {
  const images = await getUserImages();

  if (!images) {
    return <p className="text-center">Please sign in.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
    {images.length === 0
      ? <p>Please upload an image.</p>
      : images.map((image) => (
          <div
            key={image.id}
            className="flex h-48 w-48 flex-col items-center justify-between"
          >
            <img src={image.url} alt={image.name} />
            <div>{image.name}</div>
          </div>
        ))    
    }  
    </div>
  );
}
