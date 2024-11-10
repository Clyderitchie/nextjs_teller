"use client";

import { useEffect, useState } from "react";
import { findAllCustomers } from "./actions";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { useSearchParams } from "next/navigation";
import MenuButton from "@/components/MenuButton";

interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  ssn: string;
  birthday: Date;
  createdAt: Date;
  phoneNumber: string;
}

export default function Profile() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const everyCustomer = await findAllCustomers();
        setCustomers(everyCustomer);
      } catch (error) {
        console.error("Failed to load customers: ", error);
        setError("Failed to load customers");
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(query),
  );

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Style the error message */}
      {filteredCustomers.length === 0 ? (
        <p>No customers found.</p> // Display a message if no customers match the query
      ) : (
        <ul>
          {filteredCustomers.map((customer) => (
            <li
              key={customer.id}
              className="my-5 rounded-md border-2 border-black p-5"
            >
              <Link href={`/customers/${customer.id}`}>
                <div className="flex flex-col">
                  <h1 className="my-2 text-center font-bold">{customer.name}</h1>
                  <p className="ps-2">Email: {customer.email}</p>
                  <p className="ps-2">Phone: {customer.phoneNumber}</p>                  
                  <p className="ps-2">Address: {customer.address}</p>
                  <p className="ps-2">
                    Customer Since:{" "}
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          },
                        )
                      : "N/A"}
                  </p>
                  <p className="ps-2">
                    Birthday:{" "}
                    {customer.birthday
                      ? new Date(customer.birthday).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          },
                        )
                      : "N/A"}
                  </p>
                </div>
              </Link>
              <MenuButton customerId={customer.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
