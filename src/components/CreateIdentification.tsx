"use client";

import { submitIdentification } from "@/app/(main)/create/identification/actions";
import { useSession } from "@/app/(main)/SessionProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CreateIdentificationProps {
  className?: string;
  customerId: string;
}

export default function CreateIdentification({ className, customerId }: CreateIdentificationProps) {
  const { user } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    identificationNumber: "",
    identificationType: "",
    issuingCountry: "",
    issuingState: "",
    issueDate: "",
    expirationDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const identificationData = {
      identificationNumber: formData.identificationNumber,
      identificationType: formData.identificationType,
      issuingCountry: formData.issuingCountry,
      issuingState: formData.issuingState,
      issueDate: formData.issueDate,
      expirationDate: formData.expirationDate,
      customerId: customerId,
    };

    try {
      const newIdentification = await submitIdentification(identificationData);
      console.log("New ID for customer created: ", newIdentification);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error with creating Identification for the customer: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className={className}
        title="New ID"
        onClick={() => setIsModalOpen(true)}
      >
        New ID
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-center text-2xl mb-4">Identification Info</h3>
            <Input
              name="identificationNumber"
              placeholder="ID Number"
              value={formData.identificationNumber}
              onChange={handleChange}
              className="my-2 min-w-full"
            />
            <Input
              name="identificationType"
              placeholder="Type of ID"
              value={formData.identificationType}
              onChange={handleChange}
              className="my-2 min-w-full"
            />
            <Input
              name="issuingCountry"
              placeholder="Issuing Country"
              value={formData.issuingCountry}
              onChange={handleChange}
              className="my-2 min-w-full"
            />
            <Input
              name="issuingState"
              placeholder="Issuing State"
              value={formData.issuingState}
              onChange={handleChange}
              className="my-2 min-w-full"
            />
            <Input
              name="issueDate"
              placeholder="Issue Date"
              value={formData.issueDate}
              onChange={handleChange}
              className="my-2 min-w-full"
            />
            <Input
              name="expirationDate"
              placeholder="Expiration Date"
              value={formData.expirationDate}
              onChange={handleChange}
              className="my-2 min-w-full"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
