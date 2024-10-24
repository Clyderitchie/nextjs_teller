"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { findCustomerById } from "./actions";

export default function CustomerProfile() {
  const [customer, setCustomer] = useState(null); // To hold customer data
  const { id } = useParams();
  console.log("what is customer and setCustomer rendering: ", customer);
  useEffect(() => {
    async function fetchCustomer() {
      try {
        const customerProfile = await findCustomerById(id); // Pass the id to the function
        setCustomer(customerProfile);
      } catch (error) {
        console.error("Failed to fetch customer profile: ", error);
      }
    }

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  if (!customer) {
    return <p>Loading customer profile...</p>;
  }

  return (
    <>
      <div className="h-screen min-w-full bg-card p-5 shadow-md">
        <div className="rounded-md border bg-card px-2 py-3 text-start shadow-md">
          <h1 className="min-w-fit max-w-fit py-3 text-2xl">
            {customer.name}'s Profile
          </h1>
        </div>
        <div className="my-4 min-w-fit max-w-fit rounded-md border bg-card px-2 py-3 shadow-md">
          <h2 className="text-lg ps-2 font-bold">Customer Information: </h2>
          <div className="flex flex-row items-baseline my-2">
            <p className="pe-5 ps-2 text-lg font-semibold">Address: </p>
            <p>{customer.address}</p>
          </div>
          <div className="flex flex-row items-baseline my-2">
            <p className="pe-5 ps-2 text-lg font-semibold">Phone Number: </p>
            <p>{customer.phoneNumber}</p>
          </div>
          <div className="flex flex-row items-baseline my-2">
            <p className="pe-5 ps-2 text-lg font-semibold">Email: </p>
            <p>{customer.email}</p>
          </div>
        </div>

        <p>
          Customer Since: {new Date(customer.createdAt).toLocaleDateString()}
        </p>
        <p>Birthday: {new Date(customer.birthday).toLocaleDateString()}</p>
      </div>
    </>
  );
}
