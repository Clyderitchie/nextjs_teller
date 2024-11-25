"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { customerDataSelect } from "@/lib/types";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { id: string };
}

const getCustomer = cache(async (id: string) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: id,
    },
    select: customerDataSelect,
  });

  if (!customer) notFound();
  return customer;
});

export default async function CustomerAccounts({ params: { id } }: PageProps) {
  const { user } = await validateRequest();
  if (!user) {
    return <strong>Wait a minute now, go log in first</strong>;
  }

  const customer = await getCustomer(id);
  console.log(customer);

  return (
    <>
      <div className="h-screen w-full bg-card shadow-md">
        {customer ? (
          <div className="rounded-md border bg-card px-4 py-3 text-start shadow-sm">
            <h1 className="min-w-fit max-w-fit py-3 text-2xl">
              {customer.name} Accounts:
            </h1>
            <div className="flex items-end justify-start border px-5">
              <h3 className="mb-4 me-20">Account Type: </h3>
              <h3 className="mb-4 mx-20">Account Number: </h3>
              <h3 className="mb-4 mx-20">Created At: </h3>
            </div>
            {customer.accounts.map((account) => (
              <div
                className="flex flex-row items-center justify-between"
                key={account.id}
              >
                <div className="w-1/4 border-b-2 px-3 py-5">
                  <span>{account.accountType}</span>
                </div>
                <div className="w-1/3 border-b-2 px-3 py-5">
                  <span>{account.accountNumber}</span>
                </div>
                <div className="w-1/3 border-b-2 px-3 py-5">
                  {new Date(account.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Customer not found</p>
        )}
      </div>
    </>
  );
}
