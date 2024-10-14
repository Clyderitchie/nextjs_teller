" use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

interface OptionButtonProps {
  className?: string;
  onToggle: (isToggled: boolean) => void; // Callback to pass the toggle state
}


export default function OptionButton({ className, onToggle }: OptionButtonProps) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggled = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);
    onToggle(newToggleState); // Pass the new state to the parent
  };

  return (
    <div className={className} onClick={handleToggled}>
      {isToggled ? (
        <h2>No <ToggleRight /></h2>
      ) : (
        <h2>Yes <ToggleLeft /></h2>
      )}
    </div>
  );
}
