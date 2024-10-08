" use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

interface OptionButtonProps {
  className?: string;
}

export default function OptionButton({ className }: OptionButtonProps) {
  const { user } = useSession();

  const { theme, setTheme } = useTheme();

  const [isToggled, setIsToggled] = useState(false);

  const handleToggled = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <>
      <div className={className} onClick={handleToggled}>
        {isToggled ? <h2>No<ToggleRight /> </h2>: <h2>Yes <ToggleLeft /></h2>}
      </div>
    </>
  );
}
