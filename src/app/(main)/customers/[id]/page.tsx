// "use client";

import { validateRequest } from "@/auth";
import ProfileExtra from "@/components/ProfileExtraButton";
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

export default async function Page({ params: { id } }: PageProps) {
  const { user } = await validateRequest();
  if (!user) {
    return <strong>Nope, Cannot come in</strong>;
  }

  const customer = await getCustomer(id);
  console.log(customer);

  return (
    <>
      <div className="h-screen w-full bg-card p-4 shadow-md">
        {customer ? (
          <div>
            <div className="flex items-center justify-between rounded-md border bg-card px-2 py-3 text-start shadow-sm">
              <h1 className="min-w-fit max-w-fit py-3 text-3xl">
                {customer.name}
              </h1>
              <ProfileExtra customerId={customer.id} />
            </div>
            {/*Customer Name Div */}
            <div className="row-span-2 flex flex-col justify-around py-3 md:flex-row">
              <div className="mx-1 my-4 w-1/2 max-w-full rounded-md border bg-card px-2 py-3 shadow-md">
                <div className="my-2 flex flex-row items-baseline py-1">
                  <p className="pe-5 ps-2 text-lg font-semibold">Birthday: </p>
                  <p> {new Date(customer.birthday).toLocaleDateString()}</p>
                </div>
                <div className="my-2 flex flex-row items-baseline py-1">
                  <p className="pe-5 ps-2 text-lg font-semibold">
                    Customer Since:{" "}
                  </p>
                  <p>{new Date(customer.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="my-2 flex flex-row items-baseline py-1">
                  <p className="pe-5 ps-2 text-lg font-semibold">
                    Identification Type:{" "}
                  </p>
                  <p>{customer.identification}</p>
                </div>
              </div>
              {/*Customer ID Info Div */}
              <div className="my-4 w-1/2 max-w-full rounded-md border bg-card px-2 py-3 shadow-md">
                <h2 className="ps-2 text-lg font-bold">
                  Customer Information:{" "}
                </h2>
                <div className="my-2 flex flex-row items-baseline">
                  <p className="pe-5 ps-2 text-lg font-semibold">Address: </p>
                  <p>{customer.address}</p>
                </div>
                <div className="my-2 flex flex-row items-baseline">
                  <p className="pe-5 ps-2 text-lg font-semibold">
                    Phone Number:{" "}
                  </p>
                  <p>{customer.phoneNumber}</p>
                </div>
                <div className="my-2 flex flex-row items-baseline">
                  <p className="pe-5 ps-2 text-lg font-semibold">Email: </p>
                  <p>{customer.email}</p>
                </div>
              </div>
              {/*Customer Info Div */}
            </div>
            <div className="rounded-md border bg-card px-4 py-3 text-start shadow-sm">
              <h1 className="min-w-fit max-w-fit py-3 text-2xl">
                {customer.name} Accounts:
              </h1>
              {customer.accounts.map((account) => (
                <div
                  className="flex flex-row items-center justify-between"
                  key={account.id}
                >
                  <div className="w-1/4 border py-5 px-3">
                    <h3 className="mb-4">Account Type: </h3>
                    <span>{account.accountType}</span>
                  </div>
                  <div className="w-1/3 border py-5 px-3">
                    <h3 className="mb-4">Account Number: </h3>
                    <span>{account.accountNumber}</span>
                  </div>
                  <div className="w-1/3 border py-5 px-3">
                    <h3 className="mb-4">Created At: </h3>
                    {new Date(account.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Customer not found</p>
        )}
      </div>
    </>
  );
}
