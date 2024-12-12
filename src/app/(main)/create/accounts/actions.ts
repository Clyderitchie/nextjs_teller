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

    const { accountType, accountNumber, interestRate, customerId, balance } =
      createAccountSchema.parse(input);

    const newAccountData = await prisma.account.create({
      data: {
        accountType: accountType,
        accountNumber: String(accountNumber),
        interestRate: interestRate,
        customerId: customerId,
        createdAt: new Date(),
        balance: "0",
      },
    });
    console.log("Account from validate: ", newAccountData);
    return newAccountData;
  } catch (e) {
    console.error("Error with submitAccount: ", e);
    throw new Error("Error creating account");
  }
}

export async function getAccountSummary(accountId: string) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const customerAccount = await prisma.account.findUnique({
      where: { id: accountId },
      select: {
        id: true,
        accountType: true,
        accountNumber: true,
        customerId: true,
        createdAt: true,
        interestRate: true,
        balance: true,
      },
    });
    console.log("successfully found account");
    return customerAccount;
  } catch (error) {
    console.error("Failed to find account: ", error);
  }
}
