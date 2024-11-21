// "use server";

// // TODO: Refactor the submitCustomer function, it is throwing an error about identification when creating a new customer
// // TODO: Refactor submitCustomer: Idea try to refactor so that the identification data is coming from submitIdentification and not submitCustomer. Might have to refactor the createCustomerSchema in Validation file

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import {
//   createAccountSchema,
//   createCustomerSchema,
//   createIdentificationSchema,
// } from "@/lib/validations";
// import { string } from "zod";

// // export async function submitCustomer(input: {
// //   name: string;
// //   email: string;
// //   phone: string;
// //   address: string;
// //   ssn: string;
// //   birthday: string;
// // }) {
// //   const { user } = await validateRequest();

// //   if (!user) throw Error("Unauthorized");

// //   try {
// //     const parsedData = createCustomerSchema.parse(input);
// //     const { name, email, phone, address, ssn, birthday } = parsedData;

// //     const birthdayDate = new Date(birthday); // Create a Date object

// //     const customerData: any = {
// //       name: name,
// //       phoneNumber: phone,
// //       email: email,
// //       address: address,
// //       ssn: ssn,
// //       birthday: birthdayDate,
// //       userId: user.id,
// //       createdAt: new Date(),
// //     };

// //     const newClient = await prisma.customer.create({
// //       data: customerData,
// //     });

// //     console.log("Client created successfully: ", newClient);
// //     return newClient;
// //   } catch (error) {
// //     console.error("Failed to create client: ", error);
// //     throw new Error("Error creating client");
// //   }
// // }

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
