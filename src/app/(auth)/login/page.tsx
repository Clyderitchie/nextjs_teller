import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./LoginForm";
import loginImage from "@/app/assets/loginImage copy.jpg";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className=" flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
          <h1 className="text-center text-3xl font-bold">
            Login in to Clone Site
          </h1>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don&apos;t have an account Sign up
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
