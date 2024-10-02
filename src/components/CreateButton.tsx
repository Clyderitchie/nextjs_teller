"use client";

import { useTheme } from "next-themes";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

interface CreateButtonProps {
  className?: string;
}

export default function CreateButton({ className }: CreateButtonProps) {
  const { user } = useSession();

  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button variant="ghost" className="" title="Home">
        <Link href="/create">
          <UserRoundPlus />
        </Link>
      </Button>
    </>
  );
}
