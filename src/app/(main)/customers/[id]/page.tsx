import { validateRequest } from "@/auth";
import NewAccount from "@/components/Accounts/newAccount";
import { Button } from "@/components/ui/button";
import ProfileExtra from "@/components/UpdateCustomer/ProfileExtraButton";
import prisma from "@/lib/prisma";
import { customerDataSelect } from "@/lib/types";
import { notFound } from "next/navigation";
import { cache } from "react";
import CreateIdentification from "../../create/identification/page";
import CreateNewAccount from "@/components/CreateNewAccount";
import AllAccounts from "@/components/Accounts/AllAccounts";
import CardDeleteButton from "@/components/Cards/CardDelete";
import CardUpdate from "@/components/Cards/CardUpdate";
import CardExtraButton from "@/components/Cards/CardExtraButton";
import AllCards from "./[card.id]/page";
import CreateCard from "@/components/Cards/CreateNewCard";

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
  console.log("Customer from [id]: ", customer);
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
      <div className="h-screen w-full p-4">
        {customer ? (
          <div>
            <div className="flex items-center justify-between rounded-md border bg-card px-2 py-3 text-start shadow-sm">
              <h1 className="min-w-fit max-w-fit py-3 text-3xl">
                {customer.name}
              </h1>
              <ProfileExtra customerId={customer.id} accountId={""} />
              {/* <CreateIdentification customerId={customer.id} /> */}
            </div>
            {/*Customer Name Div */}
            <div className="row-span-2 flex flex-col justify-around bg-card py-3 md:flex-row">
              <div className="mx-1 my-4 w-1/2 max-w-full rounded-md border px-2 py-3 shadow-md">
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
                  {customer.identification.map((ids) => (
                    <div key={ids.id}>{ids.identificationType}</div>
                  ))}
                  {/* <p>{customer.identification.identificationType}</p> */}
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
            <div className="rounded-md bg-card px-4 py-3 text-start shadow-md">
              <div className="flex justify-between">
                <h1 className="min-w-fit max-w-fit py-3 text-2xl">
                  {customer.name} Accounts:
                </h1>
                <div className="mx-20 flex w-64 items-center justify-between p-2">
                  <AllAccounts customerId={customer.id} />
                  <CreateNewAccount customerId={customer.id} />
                </div>
              </div>
            </div>
            {/* Cards Info Div below */}
            <div className="my-3 rounded-md bg-card px-4 py-3 text-start shadow-md">
              <div className="flex justify-between">
                <h1 className="min-w-fit max-w-fit py-3 text-2xl">
                  {customer.name} Cards:
                </h1>
                <div className="mx-20 flex w-64 items-center justify-between p-2">
                  <AllCards customerId={customer.id} />
                  <CreateCard customerId={customer.id} accountId={""} />
                </div>
              </div>
              {/* {customer.Card.map((card) => (
                <div
                  className="flex flex-row items-center justify-between"
                  key={card.id}
                >
                  <div className="">
                    <CardExtraButton
                      cardId={card.id}
                      customerId={customer.id}
                    />
                  </div>
                  <div className="w-1/4 px-3 py-5">
                    <h3 className="mb-4">Card Type: </h3>
                    <span>{card.cardType}</span>
                  </div>
                  <div className="w-1/3 px-3 py-5">
                    <h3 className="mb-4">Card Number: </h3>
                    <span>{card.cardNumber}</span>
                  </div>
                  <div className="w-1/3 px-3 py-5">
                    <h3 className="mb-4">Exp Date: </h3>
                    <span>{card.expDate}</span>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        ) : (
          <p>Customer not found</p>
        )}
      </div>
    </>
  );
}
