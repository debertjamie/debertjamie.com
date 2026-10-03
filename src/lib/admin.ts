"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { gallery } from "./db/schema";
import {
  R2AccountId,
  R2AccessKeyId,
  R2SecretAccessKey,
  R2BucketName,
  R2PublicUrl,
} from "./env";
import { db } from "./db";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2AccountId!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2AccessKeyId!,
    secretAccessKey: R2SecretAccessKey!,
  },
});

export async function getPresignedUploadUrl(
  fileName: string,
  contentType: string,
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const uniqueId = crypto.randomBytes(8).toString("hex");
  const fileKey = `gallery/${uniqueId}-${fileName.replace(/\s+/g, "-")}`;

  const command = new PutObjectCommand({
    Bucket: R2BucketName!,
    Key: fileKey,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return {
    signedUrl,
    fileKey,
    publicUrl: `${R2PublicUrl!}/${fileKey}`,
  };
}

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

  revalidatePath("/gallery");
}
