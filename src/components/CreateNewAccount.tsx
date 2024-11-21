"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { useState } from "react";
import { Button } from "./ui/button";
import { submitAccount } from "@/app/(main)/create/accounts/actions";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";

interface CreateNewAccountProps {
  className?: string;
  customerId: string;
}

export default function CreateNewAccount({
  className,
  customerId,
}: CreateNewAccountProps) {
  const { user } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountType: "",
    accountNumber: "",
    interestRate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateUniqueAccountNumber = async () => {
    let unique = false;
    let newAccountNumber: string | null = null;
    const existingAccounts: any[] = []; // Simulate existing accounts

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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const accountNumber = await generateUniqueAccountNumber();

    const accountData = {
      accountType: formData.accountType,
      accountNumber: String(accountNumber),
      interestRate: formData.interestRate,
      customerId: customerId,
    };

    try {
      const newAccount = await submitAccount(accountData);
      console.log("New account for the customer: ", newAccount);
      alert("Account created successfully");
      setIsModalOpen(false);
    } catch (e) {
      console.error("Error with creating a new account for the customer: ", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className={className}
        title="New Account"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus />
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-center text-2xl text-black">
              Add New Account
            </h3>
            <Input
              name="accountType"
              placeholder="Account Type (e.g., Checking, Savings)"
              value={formData.accountType}
              onChange={handleChange}
              className="my-7 min-w-full"
            />
            <Input
              name="interestRate"
              placeholder="Interest Rate"
              value={formData.interestRate}
              onChange={handleChange}
              className="my-7 min-w-full"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
