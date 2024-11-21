// "use server";

// // TODO: Refactor the submitCustomer function, it is throwing an error about identification when creating a new customer
// // TODO: Refactor submitCustomer: Idea try to refactor so that the identification data is coming from submitIdentification and not submitCustomer. Might have to refactor the createCustomerSchema in Validation file

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import {
//   createAccountSchema,
//   createIdentificationSchema,
// } from "@/lib/validations";

// export async function submitAccount(input: {
//   accountType: string;
//   accountNumber: string;
//   interestRate: string;
//   customerId: string;
// }) {
//   try {
//     console.log("Input received in submitAccount:", input); // Log to inspect input values

//     const { accountType, accountNumber, interestRate, customerId } =
//       createAccountSchema.parse(input);

//     const newAccount = await prisma.account.create({
//       data: {
//         accountType: accountType,
//         accountNumber: String(accountNumber),
//         interestRate: interestRate,
//         customerId: customerId,
//         createdAt: new Date(),
//       },
//     });

//     console.log("Account created successfully:", newAccount);
//     return newAccount;
//   } catch (error) {
//     console.error("Failed to create account:", error);
//     throw new Error("Error creating account");
//   }
// }

// export async function submitIdentification(input: {
//   identificationNumber: string;
//   identificationType: string;
//   issuingCountry: string;
//   issuingState: string;
//   issueDate: string;
//   expirationDate: string;
//   customerId: string;
// }) {
//   try {
//     console.log("Input received in submitIdentification: ", input); // Logs to inspect input values

//     const {
//       identificationNumber,
//       identificationType,
//       issuingCountry,
//       issuingState,
//       issueDate,
//       expirationDate,
//       customerId,
//     } = createIdentificationSchema.parse(input);

//     const newIdentification = await prisma.identification.create({
//       data: {
//         identificationNumber: identificationNumber,
//         identificationType: identificationType,
//         issuingCountry: issuingCountry,
//         issuingState: issuingState,
//         issueDate: issueDate,
//         expirationDate: expirationDate,
//         customerId: customerId,
//       },
//     });

//     console.log("Identification from validate: ", newIdentification);
//     return newIdentification;
//   } catch (error) {
//     console.error("Failed to create identification:", error);
//     throw new Error("Error creating identification");
//   }
// }
