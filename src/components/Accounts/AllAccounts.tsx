// "use client";

// import Link from "next/link";
// import { Button } from "../ui/button";
// import { DollarSign } from "lucide-react";
// import { useState } from "react";
// import { findAllCustomersAccounts } from "@/app/(main)/create/cards/actions";

// interface Account {
//   id: string;
//   accountType: string;
//   accountNumber: string;
//   interestRate: string;
//   createdAt: Date;
//   customerId: string;
// }

// interface AllAccountsProps {
//   className?: string;
//   customerId: string;
// }

// export default function AllAccounts({
//   className,
//   customerId,
// }: AllAccountsProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [accounts, setAccounts] = useState<Account[]>([]);

//   const handleAllAccountsClick = async () => {
//     setIsModalOpen(true);
//     try {
//         console.log("Customer ID:", customerId);
//       const fetchedAccounts: Account[] =
//         await findAllCustomersAccounts(customerId);
//       console.log("Fetched Accounts: ", fetchedAccounts);
//       setAccounts(fetchedAccounts);
//     } catch (error) {
//       console.error("Error Fetching accounts: ", error);
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="ghost"
//         className="flex items-center justify-start gap-3"
//         title="All Accounts"
//         onClick={handleAllAccountsClick}
//       >
//         <DollarSign /> <span className="hidden lg:inline">All Accounts</span>
//       </Button>
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
//             <h2 className="mb-4 text-xl font-semibold">All Accounts</h2>
//             <div className="my-2 text-center">
//               {/* <h4 className="mb-4 text-lg text-black">Customer Accounts</h4> */}
//               <div className="flex flex-wrap justify-center space-y-2">
//                 {accounts.map((account) => (
//                   <div
//                     key={account.id}
//                     className="w-full rounded-md bg-card text-black shadow-lg"
//                   >
//                     <Link
//                     //   href={`/customers/${customerId}/accounts`}
//                     href={{pathname: `/customers/${customerId}/accounts`, query: { customerId, accountId: account.id },}}
//                     onClick={() => { console.log("Customer ID:", customerId); console.log("Account ID:", account.id); }}
//                     >
//                       <div className="flex items-center justify-around py-2">
//                         <h3 className="p-1">{account.accountType}</h3>
//                         <h3 className="p-1">{account.accountNumber}</h3>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="mt-4 flex justify-end space-x-2">
//               <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
//                 Close
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { DollarSign } from "lucide-react";
import { useState } from "react";
import { findAllCustomersAccounts } from "@/app/(main)/create/cards/actions";
import AccountSummary from "./AccountSummary";


interface Account {
  id: string;
  accountType: string;
  accountNumber: string;
  interestRate: string;
  createdAt: Date;
  customerId: string;
}

interface AllAccountsProps {
  className?: string;
  customerId: string;
}

export default function AllAccounts({
  className,
  customerId,
}: AllAccountsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleAllAccountsClick = async () => {
    setIsModalOpen(true);
    try {
      console.log("Customer ID:", customerId);
      const fetchedAccounts: Account[] =
        await findAllCustomersAccounts(customerId);
      console.log("Fetched Accounts: ", fetchedAccounts);
      setAccounts(fetchedAccounts);
    } catch (error) {
      console.error("Error Fetching accounts: ", error);
    }
  };

  const handleAccountClick = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="All Accounts"
        onClick={handleAllAccountsClick}
      >
        <DollarSign /> <span className="hidden lg:inline">All Accounts</span>
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">All Accounts</h2>
            <div className="my-2 text-center">
              <div className="flex flex-wrap justify-center space-y-2">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="w-full rounded-md bg-card text-black shadow-lg"
                    onClick={() => handleAccountClick(account.id)}
                  >
                    <div className="flex items-center justify-around py-2">
                      <h3 className="p-1">{account.accountType}</h3>
                      <h3 className="p-1">{account.accountNumber}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {selectedAccountId && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Account Summary</h2>
            <AccountSummary customerId={customerId} accountId={selectedAccountId} />
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setSelectedAccountId(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
