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


return (
//     <>
<!-- //       <div className="h-screen min-w-full bg-card p-5 shadow-md">
//         <div className="rounded-md border bg-card px-2 py-3 text-start shadow-md">
//           <h1 className="min-w-fit max-w-fit py-3 text-2xl">
//             {customer.name}'s Profile
//           </h1> -->
<!-- //         </div> -->
         <div className="my-4 min-w-fit max-w-fit rounded-md border bg-card px-2 py-3 shadow-md">
           <h2 className="text-lg ps-2 font-bold">Customer Information: </h2>
           <div className="flex flex-row items-baseline my-2">
             <p className="pe-5 ps-2 text-lg font-semibold">Address: </p>
             <p>{customer.address}</p>
           </div>
           <div className="flex flex-row items-baseline my-2">
             <p className="pe-5 ps-2 text-lg font-semibold">Phone Number: </p>
             <p>{customer.phoneNumber}</p>
           </div>
           <div className="flex flex-row items-baseline my-2">
             <p className="pe-5 ps-2 text-lg font-semibold">Email: </p>
           </div>
        </div>

//         <p>
//           Customer Since: {new Date(customer.createdAt).toLocaleDateString()}
//         </p>
//         <p>Birthday: {new Date(customer.birthday).toLocaleDateString()}</p>
//       </div>
//     </>
//   );