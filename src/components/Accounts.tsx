"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/app/(main)/SessionProvider";
import OptionButton from "./OptionButton";
import { submitAccount } from "@/app/(main)/create/actions"; // Make sure to adjust the import according to your file structure

interface AccountTypeProps {
  className?: string;
  customerId: string; // Accept customerId to create the account
}

export default function AccountType({ className, customerId }: AccountTypeProps) {
  const { user } = useSession();
  const [isChecked, setIsChecked] = useState(false); // Track the toggle state
  const [accountNumber, setAccountNumber] = useState<string | null>(null);

  const handleOptionButtonChange = (value: boolean) => {
    setIsChecked(value); // Set the toggle state based on OptionButton
    console.log(`Account creation toggled: ${value ? 'On' : 'Off'}`);
  };

  const generateUniqueAccountNumber = async () => {
    let unique = false;
    let newAccountNumber: string | null = null;

    while (!unique) {
      // Generate a random 10-digit number
      newAccountNumber = String(Math.floor(Math.random() * 10000000000)).padStart(10, "0");

      // Check against existing account numbers in the database
      const existingAccounts = await fetch("/api/accounts"); // Replace with your API endpoint to fetch accounts
      const accounts = await existingAccounts.json();

      // Check if the generated number already exists
      unique = !accounts.some((account: any) => account.accountNumber === newAccountNumber);
    }

    setAccountNumber(newAccountNumber);
    console.log(`Generated Account Number: ${newAccountNumber}`);
  };

  useEffect(() => {
    if (isChecked) {
      generateUniqueAccountNumber();
    } else {
      setAccountNumber(null); // Reset account number if unchecked
    }
  }, [isChecked]);

  const handleCreateAccount = async () => {
    if (isChecked && accountNumber) {
      try {
        const newAccount = await submitAccount({
          accountType: "Checking",
          accountNumber: accountNumber,
          customerId: customerId, // Pass customerId from props
        });
        console.log("Account created successfully:", newAccount);
        alert("Account created successfully");
      } catch (error) {
        console.error("Error creating account:", error);
      }
    }
  };

  return (
    <>
      <div className={`my-2 flex flex-col ${className}`}>
        <h2>Account Type:</h2>
      </div>
      <div className="mx-3 inline-block">
        <p>Checking:</p>
        {/* Pass the onToggle callback to the OptionButton */}
        <OptionButton checked={isChecked} onToggle={handleOptionButtonChange} />
      </div>
      <button onClick={handleCreateAccount} disabled={!isChecked || !accountNumber}>
        Create Checking Account
      </button>
      {accountNumber && <p>Generated Account Number: {accountNumber}</p>}
    </>
  );
}
