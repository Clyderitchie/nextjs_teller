"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import DeleteButton from "../DeleteButton";
import EditButton from "./EditButton";
import CreateIdentification from "../CreateIdentification";
import CreateCard from "../Cards/CreateNewCard";

interface ProfileExtraButton {
  className?: string;
  customerId: string;
  accountId: string;
}

export default function ProfileExtra({
  className,
  customerId,
  accountId,
}: ProfileExtraButton) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    console.log("Rendered with customerId:", customerId);
  }, [customerId]);

  const toggleTooltip = () => {
    setTooltipVisible((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleTooltip} className={`p-2 ${className}`}>
        <EllipsisVertical />
      </button>
      {tooltipVisible && (
        <div className="absolute right-0 z-10 mt-2 flex w-40 flex-col items-center justify-start rounded-lg bg-gray-800 p-3 text-white shadow-lg">
          <DeleteButton customerId={customerId} />
          <EditButton customerId={customerId} />
          <CreateIdentification customerId={customerId} />
        </div>
      )}
    </div>
  );
}
