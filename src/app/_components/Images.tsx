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
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {images.length === 0 ? (
        <p>Please upload an image.</p>
      ) : (
        [...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images].map((image) => (
          <div key={image.id} className="block h-48 lg:h-64 w-48 lg:w-64 bg-red-300 text-center">
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                width={192}
                height={192}
                alt={image.name}
                className="object-cover h-48 lg:h-64 w-full"
              />
              <div>{image.name}</div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
