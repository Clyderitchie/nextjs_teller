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

export const accountDataSelect = {
  id: true,
  accountNumber: true,
  customerId: true,
  createdAt: true,
  accountType: true,
} satisfies Prisma.AccountSelect;

export const customerDataSelect = {
  id: true,
  name: true,
  email: true,
  address: true,
  birthday: true,
  phoneNumber: true,
  userId: true,
  createdAt: true,
  identification: true,
  accounts: {
    select: accountDataSelect,
  },
} satisfies Prisma.CustomerSelect;

export function getCustomerSelect() {
  return {
    id: true,
    name: true,
    email: true,
    address: true,
    birthday: true,
    phoneNumber: true,
    userId: true,
    createdAt: true,
    identification: true,
    accounts: {
      select: accountDataSelect,
    },
  } satisfies Prisma.CustomerSelect;
}

export type CustomerData = Prisma.CustomerGetPayload<{
  select: ReturnType<typeof getCustomerSelect>;
}>;

export function getAccountSelect() {
  return {
    id: true,
    accountNumber: true,
    customerId: true,
    createdAt: true,
    accountType: true,
  } satisfies Prisma.AccountSelect;
}

export type AccountData = Prisma.AccountGetPayload<{
  select: ReturnType<typeof getAccountSelect>;
}>;

