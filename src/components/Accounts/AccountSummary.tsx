"use client";
import { getAccountSummary } from "@/app/(main)/create/accounts/actions";
import { useEffect, useState } from "react";

interface AccountSummaryProps {
  customerId: string;
  accountId: string;
}

interface Account {
  id: string;
  accountType: string;
  accountNumber: string;
  customerId: string;
  createdAt: Date;
  interestRate: string;
  balance: string;
}

export default function AccountSummary({
  customerId,
  accountId,
}: AccountSummaryProps) {
  const [accountSummary, setAccountSummary] = useState<Account | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountSummary = async () => {
      try {
        const account = await getAccountSummary(accountId);
        console.log("Fetched account summary: ", account);
        setAccountSummary(account);
      } catch (err) {
        console.error("Failed to fetch data for account summary: ", err);
        setError("Failed to fetch account summary.");
      }
    };
    fetchAccountSummary();
  }, [accountId]);

  return (
    <>
      <div>
        {error && <strong>{error}</strong>}
        {accountSummary ? (
          <div className="w-full rounded-md bg-card text-black shadow-lg">
            <div className="flex items-baseline justify-start">
              <h2 className="p-1">{accountSummary.accountType}:</h2>
              <h3 className="p-1">{accountSummary.accountNumber}</h3>
            </div>
            <div className="flex-col items-baseline">
              <h4 className="p-1">Balance: {accountSummary.balance}</h4>
              <h4 className="p-1">
                Open Since:{" "}
                {new Date(accountSummary.createdAt).toLocaleDateString()}
              </h4>
            </div>
          </div>
        ) : (
          <p>Loading account summary...</p>
        )}
      </div>
    </>
  );
}
