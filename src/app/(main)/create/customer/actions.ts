"use server";

// Ensure required imports are included
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
    // Parse the input data using the validation schema
    const parsedData = createCustomerSchema.parse(input);
    const { name, email, phone, address, ssn, birthday } = parsedData;

    const birthdayDate = new Date(birthday); // Convert birthday string to a Date object

    // Create the customer data object
    const customerData = {
      name,
      phoneNumber: phone,
      email,
      address,
      ssn,
      birthday: birthdayDate,
      userId: user.id,
      createdAt: new Date(),
    };

    // Create a new customer record in the database
    const newClient = await prisma.customer.create({
      data: customerData,
    });

    console.log("Client created successfully:", newClient);
    return newClient;
  } catch (error) {
    console.error("Failed to create client:", error);
    throw new Error("Error creating client");
  }
}
