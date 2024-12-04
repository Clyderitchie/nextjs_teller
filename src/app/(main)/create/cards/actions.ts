"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createCardSchema } from "@/lib/validations";

export async function submitCard(input: {
  cardType: string;
  cardNumber: string;
  expDate: string;
  ccv: string;
  accountId: string;
  customerId: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    console.log("Input received in submitCard: ", input);

    const { cardType, cardNumber, expDate, ccv, accountId, customerId } =
      createCardSchema.parse(input);

    const newCardData = await prisma.card.create({
      data: {
        cardType: cardType,
        cardNumber: cardNumber,
        expDate: expDate,
        ccv: ccv,
        accountId: accountId,
        customerId: customerId,
        createdAt: new Date(),
      },
    });

    console.log("Card created from submitCard successful: ", newCardData);
    return newCardData;
  } catch (e) {
    console.error("Card creation from submitCard error: ", e);
    throw new Error("Error with creating a card");
  }
}

export async function findAllCustomersAccounts(customerId: string) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const customerAccounts = await prisma.account.findMany({
      where: { customerId },
      select: {
        id: true,
        accountType: true,
        accountNumber: true,
        customerId: true,
      },
    });
    console.log("Finding all accounts for the customer: ", customerAccounts);
    return customerAccounts;
  } catch (error) {
    console.error("Failed to find any accounts: ", error);
  }
}