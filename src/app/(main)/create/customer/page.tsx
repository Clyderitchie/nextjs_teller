"use client"
import CreateNewCustomer from "@/components/CreateNewCustomer";
import { useState } from "react";


export default function ParentComponent() {
  const [formData, setFormData] = useState({
    CustomerName: "",
    phoneNumber: "",
    Email: "",
    Address: "",
    SSN: "",
    birthday: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <CreateNewCustomer
      formData={formData}
      handleChange={handleChange}
      isSubmitting={false}
      setIsSubmitting={() => {}}
    />
  );
}
