import { getImage } from "~/server/queries";

export default async function FullPageImageView({ id }: { id: number }) {
  const image = await getImage(id);
  
  

  return <img src={image.url} className="h-auto w-96" />;
}
