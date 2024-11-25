"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { DollarSign } from "lucide-react";

interface AllAccountsProps {
  className?: string;
  customerId: string;
}

export default function AllAccounts({
  className,
  customerId,
}: AllAccountsProps) {
    const handleAllAccountsClick = () => {
        console.log("Customer ID:", customerId);
      };
  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link
          href={`/customers/${customerId}/accounts`}
          onClick={handleAllAccountsClick}
        >
          <DollarSign />
          <span className="hidden lg:inline">All Accounts</span>
        </Link>
      </Button>
    </>
  );
}
