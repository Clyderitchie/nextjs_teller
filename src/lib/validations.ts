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
  accountType: z.enum(["Checking", "Savings"]),
  accountNumber: z
    .string()
    .length(10, "Account number must be exactly 10 digits"),
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
  accounts: z.array(createAccountSchema).optional(),
});
