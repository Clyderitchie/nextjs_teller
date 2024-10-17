"use client";

import { useEffect, useState } from "react";
import { findAllCustomers } from "./actions";

export default function profile() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
    console.log("What is customers rendering above here: ", customers);
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const everyCustomer = await findAllCustomers();
        setCustomers(everyCustomer);
      } catch (error) {
        console.log("Failed to load customers: ", error);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <>
      <div>Profile Page</div>
      <div>
        <h1>Customer List</h1>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              <strong>{customer.name}</strong>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.address}</p>
              {/* {customer.createdAt} */}
              <p>
                Birthday:{" "}
                {customer.birthday
                  ? new Date(customer.birthday).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
