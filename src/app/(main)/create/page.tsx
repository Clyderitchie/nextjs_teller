"use client";

import { Input } from "@/components/ui/input";
import { ToggleLeft, ToggleRight } from "lucide-react";

export default function CreateClient() {
  return (
    <>
      <div className="flex w-[48.5vw] flex-col justify-start md:min-w-[50vw]">
        <div className="border">
          <h2>Client Information:</h2>
          <Input
            name="ClientName"
            placeholder="Name"
            className="my-7 min-w-full"
          />
          <Input
            name="ClientName"
            placeholder="Phone Number"
            className="my-7 min-w-full"
          />
          <Input
            name="ClientName"
            placeholder="Email"
            className="my-7 min-w-full"
          />
          <div className="my-3 flex">
            {/* TODO: Make this div a choice to show either button depending on whats clicked. Checking - Savings layout */}
            <h2 className="mx-3">Account Type:</h2>
            <ToggleLeft className="mx-4" />
            Checking
            <ToggleRight className="mx-4" />
            Savings
          </div>
          <div className="my-3 flex">
            <h2 className="mx-3">Cards:</h2>
            <ToggleLeft className="mx-4" />
            Yes
            <ToggleRight className="mx-4" />
            No
          </div>
          <div className="my-3 flex">
            <h2 className="mx-3">Loans:</h2>
            <ToggleLeft className="mx-4" />
            Yes
            <ToggleRight className="mx-4" />
            No
          </div>
          <div className="my-3 flex">
            <h2 className="mx-3">Products:</h2>
            <ToggleLeft className="mx-4" />
            Online banking
            <ToggleRight className="mx-4" />
            Overdraft Protection
          </div>
        </div>
      </div>
    </>
  );
}

// TODO: Finish the input fields for createing a new client then add logic in for it.
