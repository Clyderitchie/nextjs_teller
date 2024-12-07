"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createAccountSchema } from "@/lib/validations";

export async function submitAccount(input: {
  accountType: string;
  accountNumber: string;
  interestRate: string;
  customerId: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    console.log("Input received in submitAccount", input);

    const { accountType, accountNumber, interestRate, customerId } =
      createAccountSchema.parse(input);

    const newAccountData = await prisma.account.create({
      data: {
        accountType: accountType,
        accountNumber: String(accountNumber),
        interestRate: interestRate,
        customerId: customerId,
        createdAt: new Date(),
      },
    });
    console.log("Account from validate: ", newAccountData);
    return newAccountData;
  } catch (e) {
    console.error("Error with submitAccount: ", e);
    throw new Error("Error creating account");
  }
}