"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { gallery } from "./db/schema";
import {
  R2PublicUrl,
} from "./env";
import { db } from "./db";

export async function saveImageMetadata(data: {
  url: string;
  alt: string;
  width: number;
  height: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.insert(gallery).values({
    url: data.url,
    alt: data.alt,
    width: data.width,
    height: data.height,
  });
}

export async function uploadImageAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  const alt = formData.get("alt") as string;
  const width = parseInt(formData.get("width") as string, 10);
  const height = parseInt(formData.get("height") as string, 10);

  if(!file || !alt || isNaN(width) || isNaN(height)) {
    throw new Error("Missing required fields");
  }

  const { env } = getCloudflareContext();
  const uniqueId = crypto.randomBytes(8).toString("hex");
  const fileKey = `gallery/${uniqueId}-${file.name.replace(/\s+/g, "-")}`;

  try {
    await env.GALLERY_BUCKET.put(fileKey, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
    });
    const publicUrl = `${R2PublicUrl!}/${fileKey}`;
    await saveImageMetadata({ url: publicUrl, alt, width, height });
    revalidatePath("/photos");

    return { success: true, publicUrl };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image");
  }
}
