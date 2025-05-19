import Image from "next/image";
import Link from "next/link";
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
            className="flex w-48 h-48 flex-col items-center"
          >
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                width={192}
                height={192}
                alt={image.name}
              />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
