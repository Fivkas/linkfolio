'use server'

import { prisma } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function createLink(formData: FormData) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("You must be logged in");
  }

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;

  if (!title || !url) return;

  await prisma.link.create({
    data: {
      title,
      url,
      userId: user.id,
    }
  });

  revalidatePath("/dashboard");
}