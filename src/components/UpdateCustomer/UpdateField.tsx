"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "../ui/button";
import AccountType from "../Accounts";

interface UpdateFieldProps {
  className?: string;
  formData: {
    CustomerName: string;
    phoneNumber: string;
    Email: string;
    Address: string;
    SSN: string;
    identification: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UpdateField({
  className,
  formData,
  handleChange,
}: UpdateFieldProps) {
  const { user } = useSession();

  return (
    <>
      <div className="flex flex-col space-y-4">
        <h3 className="text-black">Address: </h3>
        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={formData.Address}
          onChange={handleChange}
          className="rounded-md border p-2 text-black"
        />
        <h3 className="text-black">Email: </h3>
        <input
          type="text"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          className="rounded-md border p-2 text-black"
        />
        <h3 className="text-black">Phone Number: </h3>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="rounded-md border p-2 text-black"
        />
        <h3 className="text-black">Name: </h3>
        <input
          type="text"
          name="CustomerName"
          placeholder="Name"
          value={formData.CustomerName}
          onChange={handleChange}
          className="rounded-md border p-2 text-black"
        />
        <h3 className="text-black">SSN/TIN: </h3>
        <input
          type="text"
          name="SSN"
          placeholder="SSN"
          value={formData.SSN}
          onChange={handleChange}
          className="rounded-md border p-2 text-black"
        />
      </div>
    </>
  );
}
