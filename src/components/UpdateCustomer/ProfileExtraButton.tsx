"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import DeleteButton from "../DeleteButton";
import EditButton from "./EditButton";

interface ProfileExtraButton {
  className?: string;
  customerId: string;
}

export default function ProfileExtra({ className, customerId }: ProfileExtraButton) {
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
        <div className="flex flex-col items-center justify-start absolute right-0 z-10 mt-2 w-40 rounded-lg bg-gray-800 p-3 text-white shadow-lg"> 
          <DeleteButton customerId={customerId} />
         <EditButton customerId={customerId} />
        </div>
      )}
    </div>
  );
}
