// "use client";
// import { getAccountSummary } from "@/app/(main)/create/accounts/actions";
// // TODO: Write out the code needed for the Summary tab for the account page
// // Pass this code to the /account/[account.id] page passing customerId and accountId as the props
// // Use AllAccounts Component as a ref for how to write this.
// import { validateRequest } from "@/auth";
// import { useEffect, useState } from "react";

// interface AccountSummaryProps {
//   customerId: string;
//   accountId: string;
// }

// interface Account {
//   id: string;
//   accountType: string;
//   accountNumber: string;
//   customerId: string;
//   createdAt: Date;
//   interestRate: string;
//   balance: string;
// }

// export default async function AccountSummary({
//   customerId,
//   accountId,
// }: AccountSummaryProps) {
//   const [accountSummary, setAccountSummary] = useState<Account | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = await validateRequest();
//   if (!user)
//     return (
//       <strong>Wait a minute, how did you get here without logging in?</strong>
//     );

//   useEffect(() => {
//     const fetchAccountSummary = async () => {
//       try {
//         const account = await getAccountSummary(accountId);
//         console.log("Fetched account summary: ", account);
//         setAccountSummary(account);
//       } catch (err) {
//         console.error("Failed to fetch data for account summary: ", err);
//         setError("Failed to fetch account summary.");
//       }
//     };
//     fetchAccountSummary();
//   }, [accountId]);

//   return (
//     <>
//       <div>
        
//         {error && <strong>{error}</strong>}
//         {accountSummary ? (
//           <ul>
            
//             <li>ID: {accountSummary.id}</li>
//             <li>Account Type: {accountSummary.accountType}</li>
//             <li>Account Number: {accountSummary.accountNumber}</li>
//             <li>Customer ID: {accountSummary.customerId}</li>
//             <li>
//               Created At:
//               {new Date(accountSummary.createdAt).toLocaleDateString()}
//             </li>
//             <li>Interest Rate: {accountSummary.interestRate}</li>
//             <li>Balance: {accountSummary.balance}</li>
//           </ul>
//         ) : (
//           <p>Loading account summary...</p>
//         )}
//       </div>
//     </>
//   );
// }

"use client";
import { getAccountSummary } from "@/app/(main)/create/accounts/actions";
import { useEffect, useState } from "react";

interface AccountSummaryProps {
  customerId: string;
  accountId: string;
}

interface Account {
  id: string;
  accountType: string;
  accountNumber: string;
  customerId: string;
  createdAt: Date;
  interestRate: string;
  balance: string;
}

export default function AccountSummary({
  customerId,
  accountId,
}: AccountSummaryProps) {
  const [accountSummary, setAccountSummary] = useState<Account | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountSummary = async () => {
      try {
        const account = await getAccountSummary(accountId);
        console.log("Fetched account summary: ", account);
        setAccountSummary(account);
      } catch (err) {
        console.error("Failed to fetch data for account summary: ", err);
        setError("Failed to fetch account summary.");
      }
    };
    fetchAccountSummary();
  }, [accountId]);

  return (
    <>
      <div>
        {error && <strong>{error}</strong>}
        {accountSummary ? (
          <ul>
            <li>ID: {accountSummary.id}</li>
            <li>Account Type: {accountSummary.accountType}</li>
            <li>Account Number: {accountSummary.accountNumber}</li>
            <li>Customer ID: {accountSummary.customerId}</li>
            <li>
              Created At:
              {new Date(accountSummary.createdAt).toLocaleDateString()}
            </li>
            <li>Interest Rate: {accountSummary.interestRate}</li>
            <li>Balance: {accountSummary.balance}</li>
          </ul>
        ) : (
          <p>Loading account summary...</p>
        )}
      </div>
    </>
  );
}
