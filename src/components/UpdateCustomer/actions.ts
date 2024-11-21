"use server";

// TODO: Refactor the identification 

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { updateCustomerSchema } from "@/lib/validations";

export async function updateCustomer(input: {
  customerId: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  ssn?: string;
  identification?: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const { customerId, ...updateData } = input;
    console.log("Customer ID:", customerId);

    const validatedData = updateCustomerSchema.parse(input);

    const updateCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        name: validatedData.name,
        phoneNumber: validatedData.phone,
        email: validatedData.email,
        address: validatedData.address,
        ssn: validatedData.ssn,
        // identification: validatedData.identification,
      },
    });
    console.log("Update of customer: ", updateCustomer);
    return updateCustomer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Failed to update customer data");
  }
}
