"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createCustomerSchema } from "@/lib/validations";

export async function submitCustomer(input: {
  name: string;
  email: string;
  phone: string;
  address: string;
  ssn: string;
  birthday: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const { name, email, phone, address, ssn, birthday } = createCustomerSchema.parse(input);

    const birthdayDate = new Date(birthday); // Create a Date object

    const newClient = await prisma.customer.create({
      data: {
        id: name,
        name: name,
        phoneNumber: phone,
        email: email,
        address: address,
        ssn: ssn,
        birthday: birthdayDate,
        userId: user.id,
        createdAt: new Date(),
      },
    });
    console.log("Client created successfully: ", newClient);
    return newClient;
  } catch (error) {
    console.error("Failed to create client: ", error);
    throw new Error("Error creating client");
  }
}
