"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

interface EditButtonProps {
  className?: string;
}

export default function EditButton({ className }: EditButtonProps) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button variant="ghost" className="" title="Edit">
        Edit
      </Button>
    </>
  );
}
