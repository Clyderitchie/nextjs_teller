"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { updateCustomer } from "./actions";
import UpdateField from "./UpdateField";

export default function EditButton({ customerId }) {
  const [formData, setFormData] = useState({
    CustomerName: "",
    phoneNumber: "",
    Email: "",
    Address: "",
    SSN: "",
    identification: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`${name}: ${value}`);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateCustomerData: Record<string, any> = {customerId};

    // Conditionally add only the fields with non-empty values
    if (formData.CustomerName) updateCustomerData.name = formData.CustomerName;
    if (formData.Email) updateCustomerData.email = formData.Email;
    if (formData.phoneNumber) updateCustomerData.phone = formData.phoneNumber;
    if (formData.Address) updateCustomerData.address = formData.Address;
    if (formData.SSN) updateCustomerData.ssn = formData.SSN;
    if (formData.identification) updateCustomerData.identification = formData.identification;

    try {
      const customerUpdate = await updateCustomer(updateCustomerData);
      console.log("Customer updated:", customerUpdate);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className=""
        title="Edit"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </Button>
      {isModalOpen && (
        <div className="fixed h-fit inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Edit Customer</h2>
            <form onSubmit={handleSubmit}>
              <UpdateField formData={formData} handleChange={handleChange} />
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="px-4 py-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="secondary" className="px-4 py-2">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
