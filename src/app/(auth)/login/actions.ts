// Creates server actions for login
"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validations";
import { isRedirectError } from "next/dist/client/components/redirect";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    console.log("Login attempt with credentials:", credentials);

    const { username, password } = loginSchema.parse(credentials);

    console.log("Parsed credentials:", { username, password });

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    console.log("Fetched user:", existingUser);

    if (!existingUser || !existingUser.passwordHash) {
      console.log("User not found or missing password hash");
      return {
        error: "Incorrect username or password",
      };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    console.log("Password verification result:", validPassword);

    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    console.log("Login successful, creating session for user:", existingUser.id);
    
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong, please try again",
    };
  }
}
