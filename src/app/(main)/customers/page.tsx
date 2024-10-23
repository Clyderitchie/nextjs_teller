"use client";

import { useEffect, useState } from "react";
import { findAllCustomers } from "./actions";
import Link from "next/link";

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
            <li key={customer.id} className="my-5 border-2 border-black">
                <Link href={`/customers/${customer.name}`}>
              <div className="flex flex-col">
                <h1 className="text-center my-2">{customer.name}</h1>
                <strong className="ps-2">Email: {customer.email}</strong>
                <p className="ps-2">Phone: {customer.phoneNumber}</p>
                <p className="ps-2">Address: {customer.address}</p>
                <p className="ps-2">
                  Customer Since:{" "}
                  {customer.createdAt
                    ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "N/A"}
                </p>
                <p className="ps-2">
                  Birthday:{" "}
                  {customer.birthday
                    ? new Date(customer.birthday).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "N/A"}
                </p>
              </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
