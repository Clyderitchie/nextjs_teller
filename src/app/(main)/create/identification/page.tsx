"use client";

import { Input } from "@/components/ui/input";

export default function CreateIdentification() {
  return (
    <>
      <h3 className="text-center text-2xl">Identification Info:</h3>
      <div>
        <Input
          name="identificationNumber"
          placeholder="ID Number"
        //   value={formData.identificationNumber}
        //   onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="identificationType"
          placeholder="Type of ID"
        //   value={formData.identificationType}
        //   onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="issuingCountry"
          placeholder="Issuing Country"
        //   value={formData.issuingCountry}
        //   onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="issuingState"
          placeholder="Issuing State"
        //   value={formData.issuingState}
        //   onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="issueDate"
          placeholder="Issue Date"
        //   value={formData.issueDate}
        //   onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="expirationDate"
          placeholder="Expiration Date"
        //   value={formData.expirationDate}
        //   onChange={handleChange}
          className="my-7 min-w-full"
        />
      </div>
    </>
  );
}
