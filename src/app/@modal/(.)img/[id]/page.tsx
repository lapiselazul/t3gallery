import { getImage } from "~/server/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idAsNumber = Number(id);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid image id");
  }

  const image = await getImage(idAsNumber);

  return (<div>
    <img src={image.url} className="w-96" />
  </div>);
}
