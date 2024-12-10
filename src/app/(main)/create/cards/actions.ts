"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createCardSchema, updateCardSchema } from "@/lib/validations";
import { Account, Card } from "@prisma/client";

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

export async function findAllCustomersAccounts(customerId: string): Promise<Account[]> {
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
        createdAt: true,
        interestRate: true,
      },
    });
    console.log("Finding all accounts for the customer: ", customerAccounts);
    return customerAccounts;
  } catch (error) {
    console.error("Failed to find any accounts: ", error);
    return [];
  }
}

export async function findAllCards(customerId: string): Promise<Card[]> {
    const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  try {
    const customerCards = await prisma.card.findMany({
        where: { customerId },
        select: {
            id: true,
            cardType: true,
            cardNumber: true,
            ccv: true,
            createdAt: true,
            expDate: true,
            customerId: true,
            accountId: true
        },
    });
    console.log("Cards found successfully: ", customerCards)
    return customerCards;
  } catch (error) {
    console.error("Failed to find any cards: ", error);
    return [];
  }
}

export async function DeleteCard(cardId: string) {
    try {
        const card = await prisma.card.findUnique({
            where: { id: cardId},
        })

        if (!card) {
            throw new Error("Card not found")
        }

        await prisma.card.delete({
            where: {
                id: cardId,
            },
        });
    } catch (error) {
        console.error("Error running DeleteCard: ", error);
        throw new Error("Failed to delete card");
    }
}

export async function UpdateCard(input: {
    cardId: string;
    accountId: string;
}) {
    const { user } = await validateRequest();

    if (!user) throw Error("Unauthorized");
    
    try {
        const validatedData = updateCardSchema.parse(input);

        const updateCard = await prisma.card.update({
            where: { id: validatedData.cardId},
            data: {
                accountId: validatedData.accountId,
            },
        });
        console.log("Update of card is returning this: ", updateCard)
        return updateCard;
    } catch (error) {
        console.error("Error updating card in the actions for this: ", error);
        throw new Error("Error with card update");
    }
}