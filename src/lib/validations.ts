import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createAccountSchema = z.object({
  accountType: z.string().min(1, "Account type cannot be empty"),
  accountNumber: z
    .string()
    .length(10, "Account number must be exactly 10 digits"),
    interestRate: z.string(),
  customerId: z.string().cuid(),
});

export const createIdentificationSchema = z.object({
  identificationNumber: z
    .string()
    .min(12, "Identification Number cannot be empty"),
  identificationType: requiredString,
  issuingCountry: requiredString,
  issuingState: requiredString,
  issueDate: requiredString,
  expirationDate: requiredString,
  customerId: z.string().cuid(),
});

export const createCustomerSchema = z.object({
  name: requiredString,
  email: requiredString,
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: requiredString,
  ssn: z.string().regex(/^\d{9}$/, "SSN must be exactly 9 digits"),
  birthday: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) && date.toISOString().startsWith(value); // Validates if date is valid and in ISO-8601 format
    },
    {
      message:
        "Invalid birthday format. Must be in ISO-8601 format (YYYY-MM-DD).",
    },
  ),
  identification: z.array(createIdentificationSchema).optional(),
  accounts: z.array(createAccountSchema).optional(),
});

// Define the fields as optional for partial updates
export const updateCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),
  address: z.string().min(1, "Address is required").optional(),
  ssn: z
    .string()
    .regex(/^\d{9}$/, "SSN must be exactly 9 digits")
    .optional(),
  birthday: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true; // Allow empty value for optional field
        const date = new Date(value);
        return !isNaN(date.getTime()) && date.toISOString().startsWith(value);
      },
      {
        message:
          "Invalid birthday format. Must be in ISO-8601 format (YYYY-MM-DD).",
      },
    ),
  identification: z.array(
    z.object({
      identificationNumber: z
        .string()
        .min(12, "Identification Number cannot be empty"),
      identificationType: requiredString,
      issuingCountry: requiredString,
      issuingState: z.string().optional(),
      issueDate: requiredString,
      expirationDate: requiredString,
      customerId: z.string().cuid(),
    }),
  ),
  accounts: z
    .array(
      z.object({
        accountType: z.enum(["Checking", "Savings"]),
        accountNumber: z
          .string()
          .length(10, "Account number must be exactly 10 digits"),
        interestRate: z.string(),
        customerId: z.string().cuid(),
      }),
    )
    .optional(),
});

// Type inference for validation
export type UpdateCustomerValues = z.infer<typeof updateCustomerSchema>;
