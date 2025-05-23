import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getUserImages(userId: string | null) {
  let images;
  if (!userId) {
    images = await db.query.images.findMany({
      limit: 20,
      orderBy: (model, { desc }) => desc(model.id),
    });
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

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  redirect("/");
}
