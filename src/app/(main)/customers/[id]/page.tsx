"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // to get route params in a client component
import { findCustomerByName } from "./actions"; // Import the refactored function

export default function CustomerProfile() {
  const [customer, setCustomer] = useState(null); // To hold customer data
  const { id } = useParams(); 
  console.log("what is customer and setCustomer rendering: ", customer);
  useEffect(() => {
    async function fetchCustomer() {
      try {
        const customerProfile = await findCustomerByName(id); // Pass the name to the function
        setCustomer(customerProfile);
      } catch (error) {
        console.error("Failed to fetch customer profile: ", error);
      }
    }

    if (id) {
      fetchCustomer(); // Only fetch if 'name' is available
    }
  }, [id]); // Run the effect when 'name' changes

  if (!customer) {
    return <p>Loading customer profile...</p>; // Show a loading state
  }

  return (
    <div>
      <h1>{customer.name}'s Profile</h1>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phoneNumber}</p>
      <p>Address: {customer.address}</p>
      <p>Customer Since: {new Date(customer.createdAt).toLocaleDateString()}</p>
      <p>Birthday: {new Date(customer.birthday).toLocaleDateString()}</p>
    </div>
  );
}
