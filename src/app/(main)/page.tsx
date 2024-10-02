import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    // Main class below is responsible for setting background color for the Post screen section
    // Setting to Flex-Col for testing
    <main className="flex w-full min-w-0 flex-col gap-5">
      <div className="w-full min-w-0 space-y-5">Home Page</div>
    </main>
  );
}
