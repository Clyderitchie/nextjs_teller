"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function findAllCustomers() {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        ssn: true,
        address: true,
        createdAt: true,
        birthday: true,
      },
    });
    console.log("Customers found successfully: ", customers);
    return customers;
  } catch (error) {
    console.error("Failed to find all customers: ", error);
    throw new Error("Error finding all customers");
  }
}
