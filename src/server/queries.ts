import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getUserImages(userId: string | null) {
  let images = [];
  if (!userId) {
    images = await db.query.images.findMany({limit: 20, orderBy: (model, { desc }) => desc(model.id)});
  } else {
    images = await db.query.images.findMany({
      where: (model, { eq }) => eq(model.userId, userId),
      orderBy: (model, { desc }) => desc(model.id),
    });
  }

  return images;
}

export async function getImage(id: number) {

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");
  return image;
}
