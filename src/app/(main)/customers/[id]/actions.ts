"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function findCustomerById(id: string) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        ssn: true,
        address: true,
        createdAt: true,
        birthday: true,
        accounts: true,
        Card: true,
      },
    });
    console.log("Finding customer from this profile: ", customer);
    return customer;
  } catch (error) {
    console.error(
      "Failed to render customer profile error is in folder customers/[name] actions: ",
      error,
    );
    throw new Error(
      "Error Fetching customer from /customers/[name] actions.ts",
    );
  }
}