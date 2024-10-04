"use client";

import { Input } from "@/components/ui/input";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { submitCustomer } from "./actions";
import OptionButton from "@/components/OptionButton";

export default function CreateCustomer() {
  const [formData, setFormData] = useState({
    CustomerName: "",
    PhoneNumber: "",
    Email: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`${name}: ${value}`);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const customerData = {
      name: formData.CustomerName,
      email: formData.Email,
      phone: formData.PhoneNumber,
    };

    try {
      await submitCustomer(customerData);
      console.log("Customer data submitted: ", customerData);
    } catch (error) {
      console.error("Error submitting customer:", error);
    }
  };

  return (
    <>
      <div className="flex w-[48.5vw] flex-col justify-start md:min-w-[50vw]">
        <div className="border">
          <h2>Customer Information:</h2>
          <form onSubmit={handleSubmit}>
            <Input
              name="CustomerName"
              placeholder="Name"
              value={formData.CustomerName}
              onChange={handleChange}
              className="my-7 min-w-full"
            />
            <Input
              name="PhoneNumber"
              placeholder="Phone Number"
              value={formData.PhoneNumber}
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
            <button
              type="submit"
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Submit
            </button>
          </form>
          <div className="my-3">
            <OptionButton />
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="my-3 flex">
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
          </div> */
}
