"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { createCustomerSchema } from "@/lib/validations";

export async function submitCustomer(input: {
  name: string;
  email: string;
  phone: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const { name, email, phone } = createCustomerSchema.parse(input);

    const newClient = await prisma.customer.create({
      data: {
        id: name,
        content: `${name} - ${email} - ${phone}`,
        userId: user.id,
        createdAt: new Date().toISOString(),
      },
    });
    console.log("Client created successfully: ", newClient);
    return newClient;
  } catch (error) {
    console.error("Failed to create client: ", error);
    throw new Error("Error creating client");
  }
}
