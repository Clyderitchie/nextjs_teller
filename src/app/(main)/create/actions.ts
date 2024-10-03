// "use server";

// import prisma from "@/lib/prisma";
// import { validateRequest } from "@/auth";
// import { createCustomerSchema } from "@/lib/validations";

// export async function submitCustomer(input: {
//   name: string;
//   email: string;
//   phone: string;
// }) {
// //   const { user } = validateRequest();

// //   if (!user) throw Error("Unauthorized");

//   const { name, email, phone } = createCustomerSchema.parse(input);

//   try {
//     const newClient = await prisma.customer.create({
//       data: {
//         name,
//         email,
//         phone,
//       },
//     });
//     console.log("Client created successfully: ", newClient);
//     return newClient;
//   } catch (error) {
//     console.error("Failed to create client: ", error);
//     throw new Error("Error creating client");
//   }
// }
"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createCustomerSchema } from "@/lib/validations";

export async function submitCustomer(input: string) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  const { name, email, phone } = createCustomerSchema.parse({
    name: input,
    email: input,
    phone: input,
  });
   await prisma.customer
//    Prisma.customer is not being found but Customer model is in prisma studio and db has been pushed and merged
//    TODO: FIx prisma schema issues with customers
}
