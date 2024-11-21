// "use client";

// // TODO: Refactor so that it is create customer first REFER TO README FOR BREAKDOWN

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { useSession } from "@/app/(main)/SessionProvider";
// import {
//   submitAccount,
//   submitIdentification,
// } from "../app/(main)/create/actions"; // Adjust the import path as necessary
// import CreateIdentification from "./CreateIdentification";

// interface CreateFieldProps {
//   className?: string;
//   formData: {
//     CustomerName: string;
//     phoneNumber: string;
//     Email: string;
//     Address: string;
//     SSN: string;
//     birthday: string;
//     identificationNumber: string;
//     identificationType: string;
//     issuingCountry: string;
//     issuingState: string;
//     issueDate: string;
//     expirationDate: string;
//     accountType?: string;
//     interestRate: string;
//   };
//   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   isSubmitting: boolean;
//   setIsSubmitting: (isSubmitting: boolean) => void;
// }

// export default function CreateField({
//   className,
//   formData,
//   handleChange,
//   isSubmitting,
//   setIsSubmitting,
// }: CreateFieldProps) {
//   const { user } = useSession();

//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     const birthday = new Date(formData.birthday).toISOString();
//     if (isNaN(Date.parse(birthday))) {
//       console.error("Invalid date format for birthday");
//       setIsSubmitting(false);
//       return;
//     }

//     const customerData = {
//       name: formData.CustomerName,
//       email: formData.Email,
//       phone: formData.phoneNumber,
//       address: formData.Address,
//       ssn: formData.SSN,
//       birthday: birthday,
//     };

//     try {
//       const newCustomer = await submitCustomer(customerData);
//       console.log("Customer data submitted:", newCustomer);

//       const identificationData = {
//         identificationNumber: formData.identificationNumber,
//         identificationType: formData.identificationType,
//         issuingCountry: formData.issuingCountry,
//         issuingState: formData.issuingState,
//         issueDate: formData.issueDate,
//         expirationDate: formData.expirationDate,
//         customerId: newCustomer.id, // Pass the customerId here
//       };

//       await submitIdentification(identificationData);
//       console.log("Identification data submitted");

//       const accountType = formData.accountType;
//       const interestRate = formData.interestRate;
//       if (accountType) {
//         const accountNumber = String(
//           Math.floor(Math.random() * 10000000000),
//         ).padStart(10, "0");
//         const accountData = {
//           accountType: accountType,
//           accountNumber: String(accountNumber),
//           interestRate: interestRate,
//           customerId: newCustomer.id,
//         };

//         const newAccount = await submitAccount(accountData);
//         console.log("Account created successfully:", newAccount);
//       }

//       alert("Customer, identification, and account created successfully");
//     } catch (error) {
//       console.error(
//         "Error submitting customer, identification, or creating account:",
//         error,
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className={`${className}`}>
//         <h2 className="text-center text-2xl">New Customer Information:</h2>
//         <div>
//           <Input
//             name="CustomerName"
//             placeholder="Name"
//             value={formData.CustomerName}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="birthday"
//             type="date"
//             value={formData.birthday}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="Email"
//             placeholder="Email"
//             value={formData.Email}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="Address"
//             placeholder="Address"
//             value={formData.Address}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="SSN"
//             placeholder="SSN"
//             value={formData.SSN}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//         </div>
//         <h3 className="text-center text-2xl">Identification Info:</h3>
//         <div>
//           <Input
//             name="identificationNumber"
//             placeholder="ID Number"
//             value={formData.identificationNumber}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="identificationType"
//             placeholder="Type of ID"
//             value={formData.identificationType}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="issuingCountry"
//             placeholder="Issuing Country"
//             value={formData.issuingCountry}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="issuingState"
//             placeholder="Issuing State"
//             value={formData.issuingState}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="issueDate"
//             placeholder="Issue Date"
//             value={formData.issueDate}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="expirationDate"
//             placeholder="Expiration Date"
//             value={formData.expirationDate}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//         </div>
//         <h3 className="text-center text-2xl">Account Information:</h3>
//         <div>
//           <Input
//             name="accountType"
//             placeholder="Account Type (e.g., Checking, Savings)"
//             value={formData.accountType || ""}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//           <Input
//             name="interestRate"
//             placeholder="Interest Rate"
//             value={formData.interestRate}
//             onChange={handleChange}
//             className="my-7 min-w-full"
//           />
//         </div>
//         <button
//           type="button"
//           className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </>
//   );
// }

"use client";

// TODO: Bring in action file to handle creating a new customer for data below only

import { submitCustomer } from "@/app/(main)/create/customer/actions"; // Adjust the import path as necessary
import { useSession } from "@/app/(main)/SessionProvider";
import { Input } from "@/components/ui/input";


interface CreateCustomerProps {
  className?: string;
  formData: {
    CustomerName: string;
    phoneNumber: string;
    Email: string;
    Address: string;
    SSN: string;
    birthday: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateNewCustomer({
  className,
  formData,
  handleChange,
  isSubmitting,
  setIsSubmitting,
}: CreateCustomerProps) {
  const { user } = useSession();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const birthday = new Date(formData.birthday).toISOString();
    if (isNaN(Date.parse(birthday))) {
      console.error("Invalid date format for birthday");
      setIsSubmitting(false);
      return;
    }

    const customerData = {
      name: formData.CustomerName,
      email: formData.Email,
      phone: formData.phoneNumber,
      address: formData.Address,
      ssn: formData.SSN,
      birthday: birthday,
    };

    try {
      const newCustomer = await submitCustomer(customerData);
      console.log("New customer created: ", newCustomer);
    } catch (e) {
      console.error("Error with creating customer: ", e);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <h2 className="text-center text-2xl">New Customer Information:</h2>
      <div>
        <Input
          name="CustomerName"
          placeholder="Name"
          value={formData.CustomerName}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          className="my-7 min-w-full"
        />
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
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
      </div>
      <button
        type="button"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </>
  );
}
