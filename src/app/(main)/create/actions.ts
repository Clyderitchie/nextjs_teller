"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createAccountSchema, createCustomerSchema } from "@/lib/validations";
import { string } from "zod";

export async function submitCustomer(input: {
  name: string;
  email: string;
  phone: string;
  address: string;
  ssn: string;
  birthday: string;
  identification: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const { name, email, phone, address, ssn, birthday, identification } =
      createCustomerSchema.parse(input);

    const birthdayDate = new Date(birthday); // Create a Date object

    const newClient = await prisma.customer.create({
      data: {
        name: name,
        phoneNumber: phone,
        email: email,
        address: address,
        ssn: ssn,
        birthday: birthdayDate,
        identification: identification,
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

export async function submitAccount(input: {
  accountType: string;
  accountNumber: string;
  customerId: string; // Accept the customerId from submitCustomer
}) {
  try {
    const { accountType, accountNumber, customerId } =
      createAccountSchema.parse(input);

    const newAccount = await prisma.account.create({
      data: {
        accountType: accountType,
        accountNumber: String(accountNumber), // Store the account number as an integer
        customerId: customerId, // Use the customerId from the created customer
        createdAt: new Date(),
      },
    });

    console.log("Account created successfully: ", newAccount);
    return newAccount;
  } catch (error) {
    console.error("Failed to create account: ", error);
    throw new Error("Error creating account");
  }
}
