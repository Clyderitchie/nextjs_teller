"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  findAllCustomersAccounts,
  UpdateCard,
} from "@/app/(main)/create/cards/actions";

interface Account {
  id: string;
  accountType: string;
  accountNumber: string;
  customerId: string;
}

interface CardUpdateProps {
  className?: string;
  cardId: string;
  customerId: string;
}

export default function CardUpdate({
  className,
  cardId,
  customerId,
}: CardUpdateProps) {
  const [formData, setFormData] = useState({
    accountId: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]); // Define the state type

  useEffect(() => {
    async function loadAccounts() {
      if (customerId) {
        try {
          const fetchedAccounts: Account[] =
            await findAllCustomersAccounts(customerId);
          console.log("Fetched accounts: ", fetchedAccounts);
          setAccounts(fetchedAccounts || []); // Ensure fallback to empty array if undefined
        } catch (error) {
          console.error("Failed to fetch accounts: ", error);
        }
      }
    }
    if (isModalOpen) {
      loadAccounts();
    }
  }, [customerId, isModalOpen]);

  const handleAccountClick = (account: Account) => {
    console.log("Account selected: ", account);
    setFormData((prevData) => ({ ...prevData, accountId: account.id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateCardData = { cardId: cardId, accountId: formData.accountId };

    if (formData.accountId) updateCardData.accountId = formData.accountId;

    try {
      const updateCard = await UpdateCard(updateCardData);
      console.log("New card data: ", updateCard);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating card: ", error);
      throw new Error("Error with the update on the card.");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className={className}
        title="Update"
        onClick={() => setIsModalOpen(true)}
      >
        Update
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">
              Update account link to card
            </h2>
            <div className="my-2 text-center">
              <h4 className="mb-4 text-xl text-black">
                Which account will this card be tied to?
              </h4>
              <div className="flex flex-wrap justify-center space-x-2">
                {accounts.map((account) => (
                  <Button
                    key={account.id}
                    className="mb-2 text-black"
                    variant="outline"
                    onClick={() => handleAccountClick(account)}
                  >
                    {account.accountType} - {account.accountNumber}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
