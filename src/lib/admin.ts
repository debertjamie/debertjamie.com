"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { gallery } from "./db/schema";
import { clerkId, R2PublicUrl } from "./env";
import { db } from "./db";

const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

// Every exported function in a "use server" file is a public POST endpoint,
// so each one checks for the site owner itself. The admin page's redirect
// does not protect them. Fails closed if CLERK_USER_ID is not set.
async function requireOwner() {
  const { userId } = await auth();
  if (!userId || !clerkId || userId !== clerkId) {
    throw new Error("Unauthorized");
  }
}

// Not exported: only reachable through uploadImageAction, so nobody can insert
// arbitrary gallery rows directly.
async function saveImageMetadata(data: {
  url: string;
  alt: string;
  width: number;
  height: number;
}) {
  await db.insert(gallery).values({
    url: data.url,
    alt: data.alt,
    width: data.width,
    height: data.height,
  });
}

export async function uploadImageAction(formData: FormData) {
  await requireOwner();

  const file = formData.get("file");
  const alt = formData.get("alt");
  const width = parseInt(formData.get("width") as string, 10);
  const height = parseInt(formData.get("height") as string, 10);

  if (!(file instanceof File) || typeof alt !== "string" || !alt.trim() || isNaN(width) || isNaN(height)) {
    throw new Error("Missing required fields");
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("File too large (max 20 MB)");
  }

  const { env } = getCloudflareContext();
  const uniqueId = crypto.randomBytes(8).toString("hex");
  // Keep the key URL-safe: anything outside letters, digits, dot and dash becomes "-".
  const fileKey = `gallery/${uniqueId}-${file.name.replace(/[^\w.-]+/g, "-")}`;

  try {
    await env.GALLERY_BUCKET.put(fileKey, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
    });
    const publicUrl = `${R2PublicUrl!}/${fileKey}`;
    await saveImageMetadata({ url: publicUrl, alt: alt.trim(), width, height });
    // The route is /[lang]/photos; a plain "/photos" never matches it.
    revalidatePath("/[lang]/photos", "page");

    return { success: true, publicUrl };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image");
  }
}
