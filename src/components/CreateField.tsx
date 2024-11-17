"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSession } from "@/app/(main)/SessionProvider";
import { submitCustomer, submitAccount } from "../app/(main)/create/actions"; // Adjust the import path as necessary

interface CreateFieldProps {
  className?: string;
  formData: {
    CustomerName: string;
    phoneNumber: string;
    Email: string;
    Address: string;
    SSN: string;
    birthday: string;
    identification: string;
    accountType?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateField({
  className,
  formData,
  handleChange,
  isSubmitting,
  setIsSubmitting,
}: CreateFieldProps) {
  const { user } = useSession();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const birthday = new Date(formData.birthday).toISOString();
    if (isNaN(Date.parse(birthday))) {
      console.error("Invalid date format for birthday");
      setIsSubmitting(false);
      return;
    }

    const customerData = {
      name: formData.CustomerName,
      email: formData.Email,
      phone: formData.phoneNumber,
      address: formData.Address,
      ssn: formData.SSN,
      birthday: birthday,
      identification: formData.identification,
    };

    try {
      const newCustomer = await submitCustomer(customerData);
      console.log("Customer data submitted:", newCustomer);

      const accountType = formData.accountType;
      if (newCustomer && newCustomer.id && accountType) {
        const accountNumber = String(Math.floor(Math.random() * 10000000000)).padStart(10, "0");
        const accountData = {
          accountType: accountType,
          accountNumber: String(accountNumber),
          customerId: newCustomer.id,
        };

        const newAccount = await submitAccount(accountData);
        console.log("Account created successfully:", newAccount);

        alert("Customer and account created successfully");
      }
    } catch (error) {
      console.error("Error submitting customer or creating account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`border ${className}`}>
        <h2>Customer Information:</h2>
        <Input
          name="CustomerName"
          placeholder="Name"
          value={formData.CustomerName}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="Address"
          placeholder="Address"
          value={formData.Address}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="SSN"
          placeholder="SSN"
          value={formData.SSN}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="identification"
          placeholder="identification"
          value={formData.identification}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="accountType"
          placeholder="Account Type (e.g., Checking, Savings)"
          value={formData.accountType || ""}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <button
          type="button"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
}
