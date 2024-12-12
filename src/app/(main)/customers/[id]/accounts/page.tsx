// // AccountId/customerId render correct in AllAccounts but not passing to this code correctly
// import { validateRequest } from "@/auth";
// // import AccountSummary from "@/components/Accounts/AccountSummary";
// import prisma from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import { cache } from "react";
// import { getAccount } from "./actions";

// interface PageProps {
//   // params: { customerId: string; accountId: string };
//   customerId: string;
//   accountId: string;
// }

// // const getAccount = cache(async (customerId: string, accountId: string) => {
// //   const account = await prisma.account.findFirst({
// //     where: {
// //       id: accountId,
// //       customerId: customerId,
// //     },
// //     select: {
// //       id: true,
// //       accountType: true,
// //       accountNumber: true,
// //       interestRate: true,
// //       createdAt: true,
// //       customerId: true,
// //     },
// //   });

// //   if (!account) notFound();
// //   return account;
// // });

// export default async function AccountDetails({
//   customerId,
//   accountId,
// }: PageProps) {
//   const { user } = await validateRequest();
//   if (!user) {
//     return <strong>Wait a minute now, go log in first</strong>;
//   }

//   console.log("customerId:", customerId);
//   console.log("accountId:", accountId);

//   const account = await getAccount(customerId, accountId);
//   console.log(account);

//   return (
//     <>
//       <div className="h-screen w-full shadow-md">
//         <div className="flex items-baseline justify-around">
//           <h2>Summary</h2>
//           <h2>Transactions</h2>
//         </div>
//         <div></div>
//         {account ? (
//           <div className="rounded-md border px-4 py-3 text-start shadow-sm">
//             <h1 className="min-w-fit max-w-fit py-3 text-2xl">
//               {account.accountType}: {account.accountNumber}
//             </h1>
//             <div className="flex flex-row items-center justify-between">
//               <div className="w-1/4 border-b-2 px-3 py-5">
//                 <div className="inline-flex items-baseline">
//                   <h4 className="me-8 text-2xl">{account.accountType}</h4>
//                   <h4 className="text-xl">{account.accountNumber}</h4>
//                 </div>
//                 <h5> {new Date(account.createdAt).toLocaleDateString()}</h5>
//                 <h6>{account.interestRate}</h6>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>Account not found</p>
//         )}
//       </div>
//     </>
//   );
// }
