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

export async function deleteCustomerById(customerId: string) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    await prisma.customer.delete({
      where: {
        id: customerId,
      },
    });

    return { message: "customer was deleted successfully" };
  } catch (error) {
    console.error("Trouble with deleting this customer: ", error);
    throw new Error("Failed to delete");
  }
}
