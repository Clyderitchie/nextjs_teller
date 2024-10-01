import { validateRequest } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import prisma from "@/lib/prisma";
import { getUserDataSelect, UserData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
// import UserPosts from "./UserPosts";

interface PageProps {
  params: { username: string };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  const user = await getUser(username, loggedInUser.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUserId={loggedInUser.id} />
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h2 className="text-center text-2xl font-bold">
            {/* {user.displayName}&apos;s posts */}
          </h2>
        </div>
      </div>
    </main>
  );
}

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  return (
    <>
      <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        {/* <div className="flex items-center justify-start h-10">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          size={250}
          className="mx-auto size-full max-h-60 max-w-60 rounded-full"
        />
      </div> */}
        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
          <div className="me-auto space-y-3">
            <div>
              <h1 className="text-3xl font-bold">{user.displayName}</h1>
            </div>
            <div className="grid grid-cols-1 gap-4 p-3 md:grid-cols-2">
              <div>
                <span className="text-xl font-bold">Member since: </span>
                {formatDate(user.createdAt, "MMM d, yyyy")}
              </div>
              <div>
                <span className="text-xl font-bold">Address: </span>address
                placeholder
              </div>
              <div>
                <span className="text-xl font-bold">Phone Number: </span>phone
                number placeholder
              </div>
              <div>
                <span className="text-xl font-bold">Email: </span>email
                placeholder
              </div>
              <div>
                <span className="text-xl font-bold">SSN/TIN: </span>ssn/tin
                placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <h1 className="text-3xl font-bold">Accounts: </h1>
      </div>
      <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <h1 className="text-3xl font-bold">Products and Services: </h1>
      </div>
      <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <h1 className="text-3xl font-bold">Loans: </h1>
      </div>
    </>
  );
}
