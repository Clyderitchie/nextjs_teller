"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createIdentificationSchema } from "@/lib/validations";

export async function submitIdentification(input: {
  identificationNumber: string;
  identificationType: string;
  issuingCountry: string;
  issuingState: string;
  issueDate: string;
  expirationDate: string;
  customerId: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");
  try {
    console.log("Input received in submitIdentification: ", input); // Logs to inspect input values

    const {
      identificationNumber,
      identificationType,
      issuingCountry,
      issuingState,
      issueDate,
      expirationDate,
      customerId,
    } = createIdentificationSchema.parse(input);

    const newIdentification = await prisma.identification.create({
      data: {
        identificationNumber: identificationNumber,
        identificationType: identificationType,
        issuingCountry: issuingCountry,
        issuingState: issuingState,
        issueDate: issueDate,
        expirationDate: expirationDate,
        customerId: customerId,
      },
    });

    console.log("Identification from validate: ", newIdentification);
    return newIdentification;
  } catch (error) {
    console.error("Failed to create identification:", error);
    throw new Error("Error creating identification");
  }
}
