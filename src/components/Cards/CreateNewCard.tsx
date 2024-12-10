"use client";

import {
  findAllCustomersAccounts,
  submitCard,
} from "@/app/(main)/create/cards/actions";
import { useSession } from "@/app/(main)/SessionProvider";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Account {
    id: string;
    accountType: string;
    accountNumber: string;
    customerId: string;
    createdAt: Date;
    interestRate: string;
  }

interface CreateCardProps {
  className?: string;
  customerId: string;
  accountId: string;
}

function generateRandomNumber(length: number): string {
  let result = "";
  const characters = "0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function CreateCard({ className, customerId, accountId }: CreateCardProps) {
  const { user } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cardType: "",
    cardNumber: "",
    expDate: "",
    ccv: "",
    accountId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCardTypeClick = (type: string) => {
    setFormData((prevData) => ({
      ...prevData,
      cardType: type,
    }));
    setCurrentStep(2);
  };

  const handleAccountClick = (account: any) => {
    console.log("Account from these accounts: ", account);
    setFormData((prevData) => ({
      ...prevData,
      accountId: account.id, // Use account.id here
    }));
    setCurrentStep(3);
  };

  useEffect(() => {
    async function loadAccounts() {
      if (customerId) {
        try {
          const fetchedAccounts: Account[] = await findAllCustomersAccounts(customerId);
          console.log("Fetched accounts: ", fetchedAccounts);
          setAccounts(fetchedAccounts);
        } catch (error) {
          console.error("Failed to fetch accounts: ", error);
        }
      }
    }
    loadAccounts();
  }, [customerId]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const fixedPrefix = "10012002";
    const randomSuffix = generateRandomNumber(8);
    const cardNumber = fixedPrefix + randomSuffix;

    const ccv = generateRandomNumber(3);

    const currentDate = new Date();
    const expDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() + 3),
    );
    const expDateString = `${expDate.getMonth() + 1}/${expDate.getFullYear()}`;

    const cardData = {
      cardType: formData.cardType,
      cardNumber: cardNumber,
      expDate: expDateString,
      ccv: ccv,
      accountId: formData.accountId,
      customerId: customerId,
    };

    try {
      const newCard = await submitCard(cardData);
      console.log("New card created for the customer: ", newCard);
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Error with creating card from CreateNewCard component: ",
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h4 className="mb-4 text-xl text-black">
              What type of card would you like?
            </h4>
            <Button
              className="text-black"
              variant="outline"
              onClick={() => handleCardTypeClick("New")}
            >
              New Card
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="my-2 text-center">
            <h4 className="mb-4 text-xl text-black">
              Which account will this be tied to?
            </h4>
            <div className="flex flex-wrap justify-center space-x-2">
              {accounts.map((account) => (
                <Button
                  key={account.id} // Ensure the correct key
                  className="mb-2 text-black"
                  variant="outline"
                  onClick={() => handleAccountClick(account)}
                >
                  {account.accountType} - {account.accountNumber}
                </Button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className={className}
        title="New Card"
        onClick={() => setIsModalOpen(true)}
      >
        New Card
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-center text-2xl">Card Info</h3>
            {renderStep()}
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
