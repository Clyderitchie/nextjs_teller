"use client";

import { getCardSummary } from "@/app/(main)/create/cards/actions";
import { useEffect, useState } from "react";

interface CardSummaryProps {
  customerId: string;
  cardId: string;
}

interface Card {
  id: string;
  cardType: string;
  cardNumber: string;
  expDate: string;
  ccv: string;
  accountId: string;
  createdAt: Date;
}

export default function CardSummary({ customerId, cardId }: CardSummaryProps) {
  const [cardSummary, setCardSummary] = useState<Card | null>(null);

  useEffect(() => {
    const fetchedCardSummary = async () => {
      try {
        const card = await getCardSummary(cardId);
        console.log("Fetched card Summary: ", card);
        setCardSummary(card);
      } catch (error) {
        console.error("Error fetching card data: ", error);
      }
    };
    fetchedCardSummary();
  }, [cardId]);

  return (
    <>
      <div>
        {cardSummary ? (
          <div className="w-full rounded-md bg-card text-black shadow-lg">
            <div className="flex items-baseline justify-start">
              <h3 className="p-1">Card Number: {cardSummary.cardNumber}</h3>
            </div>
            <div className="flex-col items-baseline">
              <h3 className="p-1">Exp Date: {cardSummary.expDate}</h3>
            </div>
            <div className="flex-col items-baseline">
              <h3 className="p-1">Open Since:
              {new Date(cardSummary.createdAt).toLocaleDateString()}</h3>
            </div>
          </div>
        ) : (
          <p>Loading card summary...</p>
        )}
      </div>
    </>
  );
}
