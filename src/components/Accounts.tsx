import { useEffect, useState } from "react";
import { useSession } from "@/app/(main)/SessionProvider";
import OptionButton from "./OptionButton";
import { submitAccount } from "@/app/(main)/create/actions";

interface AccountTypeProps {
  className?: string;
  customerId: string;
}

export default function AccountType({
  className,
  customerId,
}: AccountTypeProps) {
  const { user } = useSession();
  const [isChecked, setIsChecked] = useState(false);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string>("");

  useEffect(() => {
    console.log("Current accountType state:", accountType); // Log the current state of accountType
  }, [accountType]); // This will log whenever accountType changes

  const handleOptionButtonChange = (value: boolean) => {
    setIsChecked(value);
    console.log(`Account creation toggled: ${value ? "On" : "Off"}`);
  };

  const generateUniqueAccountNumber = async () => {
    let unique = false;
    let newAccountNumber: string | null = null;

    while (!unique) {
      newAccountNumber = String(
        Math.floor(Math.random() * 10000000000),
      ).padStart(10, "0");

      const existingAccounts = await fetch("/api/accounts");
      const accounts = await existingAccounts.json();

      unique = !accounts.some(
        (account: any) => account.accountNumber === newAccountNumber,
      );
    }

    setAccountNumber(newAccountNumber);
    console.log(`Generated Account Number: ${newAccountNumber}`);
  };

  useEffect(() => {
    if (isChecked) {
      generateUniqueAccountNumber();
    } else {
      setAccountNumber(null);
    }
  }, [isChecked]);

  const handleCreateAccount = async () => {
    console.log("Account type at the time of submission:", accountType);
    if (isChecked && accountNumber && accountType) {
      try {
        console.log("Account type before submission:", accountType);
        const newAccount = await submitAccount({
          accountType: accountType,
          accountNumber: accountNumber,
          customerId: customerId,
        });
        console.log("Account created successfully. Details of newAccount:", newAccount);
        alert("Account created successfully");
      } catch (error) {
        console.error("Error creating account:", error);
      }
    } else {
      alert("Please specify the account type and make sure it’s enabled.");
    }
  };

  return (
    <>
      <div className={`my-2 flex flex-col ${className}`}>
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
      </div>
      <div className="mx-3 inline-block">
        <p>Enable Account Creation:</p>
        <OptionButton checked={isChecked} onToggle={handleOptionButtonChange} />
      </div>
      <button
        onClick={handleCreateAccount}
        disabled={!isChecked || !accountNumber || !accountType}
      >
        Create Account
      </button>
      {accountNumber && <p>Generated Account Number: {accountNumber}</p>}
    </>
  );
}