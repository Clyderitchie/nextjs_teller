import { Prisma } from "@prisma/client";

export const userDataSelect = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

// export const postDataInclude = {
//   //Prisma way of doing a JOIN for the schema. User is the model and select is the data we want to show in the UI/Front End
//   user: {
//     select: userDataSelect,
//   },
// } satisfies Prisma.PostInclude;

// export type PostData = Prisma.PostPayload<{
//   include: typeof postDataInclude;
// }>;
