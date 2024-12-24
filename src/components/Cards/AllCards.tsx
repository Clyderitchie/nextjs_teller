"use client";

import { findAllCards } from "@/app/(main)/create/cards/actions";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import CardSummary from "./CardSummary";

interface Card {
  id: string;
  cardNumber: string;
  cardType: string;
  expDate: string;
  ccv: string;
  customerId: string;
  accountId: string;
}

interface AllCardsProps {
  customerId: string;
}

export default function AllCards({ customerId }: AllCardsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleAllCardClick = async () => {
    setIsModalOpen(true);
    try {
      const fetchedCards: Card[] = await findAllCards(customerId);
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching all cards: ", error);
    }
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
  }

  useEffect(() => {
    if (isModalOpen) {
      console.log("Component");
    }
  }, [isModalOpen]);

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="All Cards"
        onClick={handleAllCardClick}
      >
        <CreditCard /> <span className="hidden lg:inline"> All Cards</span>
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">All Cards</h2>
            <div className="my-2 text-center">
              <div className="flex flex-wrap justify-center space-y-2">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="w-full rounded-md bg-card text-black shadow-lg"
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div className="flex items-center justify-around py-2">
                      <h3 className="p-1">{card.cardType}</h3>
                      <h3 className="p-1">{card.cardNumber}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {selectedCardId && (
         <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
         <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
           <h2 className="mb-4 text-xl font-semibold">Card Summary</h2>
          <CardSummary customerId={customerId} cardId={selectedCardId} />
           <div className="mt-4 flex justify-end space-x-2">
             <Button variant="secondary" onClick={() => setSelectedCardId(null)}>
               Close
             </Button>
           </div>
         </div>
       </div>
      )}
    </>
  );
}
