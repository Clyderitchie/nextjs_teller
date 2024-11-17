import { useEffect, useState } from "react";

interface AccountTypeProps {
  customerId: string | null;
  onAccountCreated: () => void;
}

export default function AccountType({ customerId, onAccountCreated }: AccountTypeProps) {
  const [accountType, setAccountType] = useState<string>("");

  const generateUniqueAccountNumber = async () => {
    let unique = false;
    let newAccountNumber: string | null = null;
    const existingAccounts = []; // Simulate existing accounts

    while (!unique) {
      newAccountNumber = String(
        Math.floor(Math.random() * 10000000000),
      ).padStart(10, "0");

      unique = !existingAccounts.some(
        (account: any) => account.accountNumber === newAccountNumber,
      );
    }

    return newAccountNumber;
  };

  const handleCreateAccount = async () => {
    console.log("handleCreateAccount called");
    if (accountType && customerId) {
      try {
        console.log("Account type:", accountType);
        const accountNumber = await generateUniqueAccountNumber();
        console.log("Generated Account Number:", accountNumber);

        // Simulate account submission
        const newAccount = {
          accountType: accountType,
          accountNumber: accountNumber,
          customerId: customerId,
        };
        console.log("Account created successfully:", newAccount);
        alert("Account created successfully");
        onAccountCreated();
      } catch (error) {
        console.error("Error creating account:", error);
      }
    } else {
      console.log("Account type or customer ID missing");
      alert("Please specify the account type and ensure a customer ID is available.");
    }
  };

  return (
    <div className="account-creation">
      <div className="my-2 flex flex-col">
        <h2>Account Type:</h2>
        <input
          type="text"
          placeholder="Enter account type (e.g., Checking, Savings)"
          value={accountType}
          onChange={(e) => {
            setAccountType(e.target.value);
            console.log("Account Type Input:", e.target.value);
          }}
          className="rounded border p-2"
        />
        <button onClick={handleCreateAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
}
