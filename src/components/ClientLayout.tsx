"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/app/(main)/Navbar";
import MenuBar from "@/app/(main)/MenuBar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showMenuBar, setShowMenuBar] = useState(false);
  useEffect(() => {
    if (pathname.startsWith("/customers/")) {
      setShowMenuBar(true);
    } else {
      setShowMenuBar(false);
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl grow items-center justify-center gap-5 p-5">
        {showMenuBar && (
          <MenuBar
            className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80"
            customerId={""}
          />
        )}
        {children}
      </div>
      {showMenuBar && (
        <MenuBar
          className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden"
          customerId={""}
        />
      )}
    </div>
  );
}
