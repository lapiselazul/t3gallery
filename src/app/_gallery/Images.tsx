import Image from "next/image";
import { getUserImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function Images() {
  const images = await getUserImages();

  if (!images) {
    return <p className="text-center">Please sign in.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.length === 0 ? (
        <p>Please upload an image.</p>
      ) : (
        images.map((image) => (
          <div
            key={image.id}
            className="flex flex-col w-48 h-48 items-center justify-between relative"
          >
            <Image
              src={image.url}
              style={{ objectFit: "cover" }}
              fill={true}
              alt={image.name}
            />
          </div>
        ))
      )}
    </div>
  );
}
