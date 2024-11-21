"use client";

import { Input } from "@/components/ui/input";

export default function CreateAccount() {
  return (
    <>
      <h3 className="text-center text-2xl">Account Information:</h3>
      <div>
        <Input
          name="accountType"
          placeholder="Account Type (e.g., Checking, Savings)"
        //   value={formData.accountType || ""}
        //   onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="interestRate"
          placeholder="Interest Rate"
        //   value={formData.interestRate}
        //   onChange={handleChange}
          className="my-7 min-w-full"
        />
      </div>
    </>
  );
}
