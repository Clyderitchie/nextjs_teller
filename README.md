This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


TODO: 
<!-- -   Refactor the Add New Account for an existing customer DONE -->
-   Refactor the Schemas to add in more detail for Customers 
    -   ID's (Types, ISS, EXP, Number, State/Country)
    -   Hash important data SSN Phone numbers and so on
    -   Remarks
-   Add in page for CFR/BFR's 
    -   Store this data in the schema under both Customer and Accounts
-   Layout for Account, Loans, Cards, and any edit pages
    -   Edit pages have same layout style
    -   Accounts, Loans, Info, and Profile have a similar layout for their pages
-   Adding a Debit Card for a Customer and have it attached to an Account
    -   Hash the Card info, Number, CVV, and EXP Date
-   Clean up after this is done
    -   Styling
    -   Comments for testing
-   Deploy and make sure it is up to date with latest commit
<!-- -   CREATE CUSTOMER REFACTOR 
    -   Break down creation into different parts
    -   Part 1: Creating customer first name, birthday, ssn, phone, email, and address
    -   Part 2: Create the identification for that new customer
    -   Part 3: any accounts the customer may have or need to open
    -   IDEA here is to have a page for each part and that way once a new customer is created and has an ID it will be passed down to the other pages so everything is linked
    -   May have to refactor the code in Validations and Actions files for create route. 
    -   Time being have each part be its on page.  -->
    