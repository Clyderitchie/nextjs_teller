// "use client";

// import { useEffect, useState } from "react";
// import { findAllCustomers } from "./actions";
// import Link from "next/link";
// import DeleteButton from "@/components/DeleteButton";
// import { useSearchParams } from "next/navigation";

// interface Customer {
//   id: string;
//   name: string;
//   email: string;
//   address: string;
//   ssn: string;
//   birthday: Date;
//   createdAt: Date;
//   phoneNumber: string;
// }

// export default function Profile() {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const query = searchParams.get("q")?.toLowerCase() || "";

//   useEffect(() => {
//     async function fetchCustomers() {
//       try {
//         const everyCustomer = await findAllCustomers();
//         setCustomers(everyCustomer);
//       } catch (error) {
//         console.log("Failed to load customers: ", error);
//         setError("Failed to load customers");
//       }
//     }

//     fetchCustomers();
//   }, []);

//   const filteredCustomers = customers.filter((customer) =>
//     customer.name.toLowerCase().includes(query),
//   );

//   return (
//     <div>
//       <h1>Customer List</h1>
//       {error && <p>{error}</p>}
//       <ul>
//         {filteredCustomers.map((customer) => (
//           <li key={customer.id} className="my-5 border-2 border-black">
//             <Link href={`/customers/${customer.id}`}>
//               <div className="flex flex-col">
//                 <h1 className="my-2 text-center">{customer.name}</h1>
//                 <strong className="ps-2">Email: {customer.email}</strong>
//                 <p className="ps-2">Phone: {customer.phoneNumber}</p>
//                 <p className="ps-2">ID: {customer.id}</p>
//                 <p className="ps-2">Address: {customer.address}</p>
//                 <p className="ps-2">
//                   Customer Since:{" "}
//                   {customer.createdAt
//                     ? new Date(customer.createdAt).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "2-digit",
//                         day: "2-digit",
//                       })
//                     : "N/A"}
//                 </p>
//                 <p className="ps-2">
//                   Birthday:{" "}
//                   {customer.birthday
//                     ? new Date(customer.birthday).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "2-digit",
//                         day: "2-digit",
//                       })
//                     : "N/A"}
//                 </p>
//               </div>
//             </Link>
//             <DeleteButton customerId={customer.id} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { findAllCustomers } from "./actions";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { useSearchParams } from "next/navigation";

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

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(query)
  );

  return (
    <div>
      <h1>Customer List</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Style the error message */}
      {filteredCustomers.length === 0 ? (
        <p>No customers found.</p> // Display a message if no customers match the query
      ) : (
        <ul>
          {filteredCustomers.map(customer => (
            <li key={customer.id} className="my-5 border-2 border-black">
              <Link href={`/customers/${customer.id}`}>
                <div className="flex flex-col">
                  <h1 className="my-2 text-center">{customer.name}</h1>
                  <strong className="ps-2">Email: {customer.email}</strong>
                  <p className="ps-2">Phone: {customer.phoneNumber}</p>
                  <p className="ps-2">ID: {customer.id}</p>
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
              <DeleteButton customerId={customer.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
