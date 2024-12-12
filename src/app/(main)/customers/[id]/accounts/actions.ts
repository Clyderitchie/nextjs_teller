"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function getAccount(customerId: string, accountId: string) {
    const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized"); 

  try {
    const account = await prisma.account.findFirst({
        where: {
            id: accountId,
            customerId: customerId,
          },
          select: {
            id: true,
            accountType: true,
            accountNumber: true,
            interestRate: true,
            createdAt: true,
            customerId: true,
          },
    });
    return account; 
  } catch (error) {
    console.error("Failed to get account data: ", error);
  }
} 