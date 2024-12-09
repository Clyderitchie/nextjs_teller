"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import AccountType from "../Accounts";

interface NewAccountProps {
  customerId: string;
}

export default function NewAccount({ customerId }: NewAccountProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccountCreation = () => {
    // Trigger account creation in the AccountType component
    setIsModalOpen(false);
    alert("Account creation process initiated!");
  };

  return (
    <>
      <Button className="bg-black p-2" onClick={() => setIsModalOpen(true)}>
        <Plus />
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3>New Account: </h3>
            <AccountType customerId={customerId} onAccountCreated={function (): void {
                          throw new Error("Function not implemented.");
                      } } />
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                type="submit"
                variant="secondary"
                className="px-4 py-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="secondary"
                className="px-4 py-2"
                onClick={handleAccountCreation}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
