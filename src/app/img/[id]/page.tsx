import FullPageImageView from "~/components/full-image-page";

export default async function ImgPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idAsNumber = Number(id);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid image id");
  }

  return <FullPageImageView id={idAsNumber} />;
}
