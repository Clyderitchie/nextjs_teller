"use client";

import { DeleteCard } from "@/app/(main)/create/cards/actions";
import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "../ui/button";

interface CardDeleteProps {
  className?: string;
  cardId: string;
}

export default function CardDeleteButton({
  className,
  cardId,
}: CardDeleteProps) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!cardId) {
      return;
    }

    setIsDeleting(true);

    try {
      await DeleteCard(cardId);
      alert("Card was deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting card coming from CardDeleteButton: ",
        error,
      );
      throw new Error("Failed to delete card.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        className="text-black"
        title="Delete"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        Delete
      </Button>
    </>
  );
}
