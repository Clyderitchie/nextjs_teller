"use client";

import { useState } from "react";
import CreateField from "@/components/CreateNewCustomer";

export default function CreateCustomer() {
  const [formData, setFormData] = useState({
    CustomerName: "",
    phoneNumber: "",
    Email: "",
    Address: "",
    SSN: "",
    birthday: "",
    identificationNumber: "",
    identificationType: "",
    issuingCountry: "",
    issuingState: "",
    issueDate: "",
    expirationDate: "",
    accountType: "",
    interestRate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`${name}: ${value}`);
  };

  return (
    <CreateField
      formData={formData}
      handleChange={handleChange}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      className="w-[48.5vw] md:min-w-[50vw]"
    />
  );
}
