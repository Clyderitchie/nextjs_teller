"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { submitCustomer } from "./actions";
import OptionButton from "@/components/OptionButton";

export default function CreateCustomer() {
  const [formData, setFormData] = useState({
    CustomerName: "",
    phoneNumber: "",
    Email: "",
    Address: "",
    SSN: "",
    birthday: "",
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

    const birthday = new Date(formData.birthday).toISOString();
    if (isNaN(Date.parse(birthday))) {
      console.error("Invalid date format for birthday");
      return; // Prevent submission if birthday is invalid
    }

    const customerData = {
      name: formData.CustomerName,
      email: formData.Email,
      phone: formData.phoneNumber, 
      address: formData.Address,
      ssn: formData.SSN, // Send as string
      birthday: birthday,
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
              name="birthday"
              type="date" // Set the type to date
              value={formData.birthday}
              onChange={handleChange}
              className="my-7 min-w-full"
            />
            <Input
              name="phoneNumber"
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
            <button
              type="submit"
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Submit
            </button>
          </form>
          <div className="my-3 border">
            <div className="my-2 flex flex-col">
              <h2>Account Type:</h2>
            </div>
            <div className="mx-3 inline-block">
              <p>Checking:</p>
              <OptionButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
