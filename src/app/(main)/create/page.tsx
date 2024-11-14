"use client";

import { useState } from "react";
import { submitCustomer, submitAccount } from "./actions"; // Import submitAccount
import CreateField from "@/components/CreateField";

export default function CreateCustomer() {
  const [formData, setFormData] = useState({
    CustomerName: "",
    phoneNumber: "",
    Email: "",
    Address: "",
    SSN: "",
    birthday: "",
    identification: "",
  });

  const [accountType, setAccountType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a loading state

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`${name}: ${value}`);
  }

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountType(e.target.value);
    console.log("Account Type Input:", e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const birthday = new Date(formData.birthday).toISOString();
    if (isNaN(Date.parse(birthday))) {
      console.error("Invalid date format for birthday");
      setIsSubmitting(false);
      return; // Prevent submission if birthday is invalid
    }

    const customerData = {
      name: formData.CustomerName,
      email: formData.Email,
      phone: formData.phoneNumber,
      address: formData.Address,
      ssn: formData.SSN, // Send as string
      birthday: birthday,
      identification: formData.identification,
    };

    try {
      // First, submit the customer data and get the customerId
      const newCustomer = await submitCustomer(customerData);
      console.log("Customer data submitted: ", newCustomer);

      if (newCustomer && newCustomer.id) {
        // Then, automatically create an account for the newly created customer
        const accountNumber = String(Math.floor(Math.random() * 10000000000)).padStart(10, "0"); // Generate a random account number

        const accountData = {
          accountType: accountType,
          accountNumber: String(accountNumber),
          customerId: newCustomer.id, // Use the new customer's ID
        };

        const newAccount = await submitAccount(accountData);
        console.log("Account created successfully: ", newAccount);

        alert("Customer and account created successfully!");
      }
    } catch (error) {
      console.error("Error submitting customer or creating account:", error);
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CreateField formData={formData} handleChange={handleChange} className="w-[48.5vw] md:min-w-[50vw]" />
        
        {/* Input field for account type */}
        <div className="my-2">
          <label htmlFor="accountType">Account Type:</label>
          <input
            type="text"
            id="accountType"
            name="accountType"
            placeholder="Enter account type (e.g., Checking, Savings)"
            value={accountType}
            onChange={handleAccountTypeChange}
            className="rounded border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          disabled={isSubmitting} // Disable the button while submitting
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
