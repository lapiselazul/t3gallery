import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { getUserImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function Images() {
  const user = await auth();
  const images = await getUserImages(user.userId);

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {images.length === 0 ? (
        <p>Please upload an image.</p>
      ) : (
        images.map((image) => (
          <div
            key={image.id}
            className="block h-48 w-48 bg-red-300 text-center lg:h-64 lg:w-64"
          >
            <Link href={`/img/${image.id}`} scroll={false}>
              <Image
                src={image.url}
                width={192}
                height={192}
                alt={image.name}
                className="h-48 w-full object-cover lg:h-64"
              />
              <div>{image.name}</div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
