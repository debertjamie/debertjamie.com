"use server";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { board } from "./db/schema";
import { colorIndex } from "./board-colors";

export async function createMessage(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to post.");

  const content = formData.get("content") as string;
  const color = formData.get("color") as string;

  let colorChoice = colorIndex.indexOf(color);
  if (colorChoice === -1) colorChoice = 0;

  await db.insert(board).values({
    email: user.emailAddresses[0].emailAddress,
    username: user.firstName || "Anonymous",
    userAvatar: user.imageUrl,
    content,
    colorChoice,
  });

  revalidatePath("/[lang]/board", "page");
}
