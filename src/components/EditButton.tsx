"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useState } from "react";
import AccountType from "./Accounts";

interface EditButtonProps {
  className?: string;
}

export default function EditButton({ className }: EditButtonProps) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputData, setInputData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <Button
        onClick={toggleModal}
        variant="ghost"
        className={className}
        title="Edit"
      >
        Edit
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-md rounded-md bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-black underline text-center">Edit Information</h2>
            <div className="flex flex-col space-y-4">
                <h3 className=" text-black">Address: </h3>
              <input
                type="text"
                name="field1"
                placeholder="Address"
                value={inputData.field1}
                onChange={handleInputChange}
                className="rounded-md border p-2"
              />
              <h3 className=" text-black">Email: </h3>
              <input
                type="text"
                name="field2"
                placeholder="Email"
                value={inputData.field2}
                onChange={handleInputChange}
                className="rounded-md border p-2"
              />
              <h3 className=" text-black">Phone Number: </h3>
              <input
                type="text"
                name="field3"
                placeholder="Phone Number"
                value={inputData.field3}
                onChange={handleInputChange}
                className="rounded-md border p-2"
              />
               <h3 className=" text-black">Name: </h3>
              <input
                type="text"
                name="field4"
                placeholder="Name"
                value={inputData.field3}
                onChange={handleInputChange}
                className="rounded-md border p-2"
              />
              <AccountType customerId={""}/>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={toggleModal} className="mr-2">
                Close
              </Button>
              <Button variant="secondary" onClick={() => console.log(inputData)}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
