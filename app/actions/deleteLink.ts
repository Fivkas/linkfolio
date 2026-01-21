'use server'

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteLink(linkId: string) {
  // 1. Authenticate user
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  // 2. Security Check: Ensure the link actually belongs to this user
  // We try to find a link with THIS id AND THIS userId
  const link = await prisma.link.findUnique({
    where: {
      id: linkId,
      userId: user.id, // Must match the logged-in user
    },
  });

  if (!link) {
    throw new Error("Link not found or unauthorized");
  }

  // 3. Delete the link
  await prisma.link.delete({
    where: { id: linkId },
  });

  // 4. Refresh the dashboard
  revalidatePath("/dashboard");
}