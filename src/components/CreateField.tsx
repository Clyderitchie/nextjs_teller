"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSession } from "@/app/(main)/SessionProvider";
import OptionButton from "@/components/OptionButton";
import AccountType from "./Accounts";

interface CreateFieldProps {
  className?: string;
  formData: {
    CustomerName: string;
    phoneNumber: string;
    Email: string;
    Address: string;
    SSN: string;
    birthday: string;
    identification: string
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateField({
  className,
  formData,
  handleChange,
}: CreateFieldProps) {
  const { user } = useSession();
  // console.log(AccountType);

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
          type="date" // Set the type to date
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
        <div className="my-3 border">
         <AccountType customerId={""}/>
        </div>
      </div>
    </>
  );
}
