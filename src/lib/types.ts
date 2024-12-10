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

export const identificationDataSelect = {
  id: true,
  customerId: true,
  identificationNumber: true,
  identificationType: true,
  issuingCountry: true,
  issuingState: true,
  issueDate: true,
  expirationDate: true,
};

export const accountDataSelect = {
  id: true,
  accountNumber: true,
  customerId: true,
  createdAt: true,
  accountType: true,
  balance: true,
} satisfies Prisma.AccountSelect;

export const cardDataSelect = {
  id: true,
  cardType: true,
  cardNumber: true,
  ccv: true,
  expDate: true,
  accountId: true,
  customerId: true,
  createdAt: true,
} satisfies Prisma.CardSelect;

export const customerDataSelect = {
  id: true,
  name: true,
  email: true,
  address: true,
  birthday: true,
  phoneNumber: true,
  userId: true,
  createdAt: true,
  identification: {
    select: identificationDataSelect,
  },
  accounts: {
    select: accountDataSelect,
  },
  Card: {
    select: cardDataSelect,
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
    Card: {
      select: cardDataSelect
    }
  } satisfies Prisma.CustomerSelect;
}

export type CustomerData = Prisma.CustomerGetPayload<{
  select: ReturnType<typeof getCustomerSelect>;
}>;

export function getCardSelect() {
  return {
    id: true,
    cardType: true,
    cardNumber: true,
    ccv: true,
    expDate: true,
    accountId: true,
    customerId: true,
    createdAt: true,
  };
}

export type CardData = Prisma.CardGetPayload<{
  select: ReturnType<typeof getCardSelect>;
}>;

export function getAccountSelect() {
  return {
    id: true,
    accountNumber: true,
    customerId: true,
    createdAt: true,
    accountType: true,
    balance: true,
  } satisfies Prisma.AccountSelect;
}

export function getIdentificationSelect() {
  return {
    id: true,
    identificationNumber: true,
    identificationType: true,
    issuingCountry: true,
    issuingState: true,
    issueDate: true,
    expirationDate: true,
  } satisfies Prisma.IdentificationSelect;
}

export type IdentificationData = Prisma.IdentificationGetPayload<{
  select: ReturnType<typeof getIdentificationSelect>;
}>;

export type AccountData = Prisma.AccountGetPayload<{
  select: ReturnType<typeof getAccountSelect>;
}>;

export type UpdateCustomerData = Prisma.CustomerUpdateArgs["data"] & {
  select?: ReturnType<typeof getCustomerSelect>;
};
