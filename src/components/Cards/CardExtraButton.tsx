"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import { EllipsisVertical } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import CardUpdate from "./CardUpdate";
import CardDeleteButton from "./CardDelete";

interface CardExtraProps {
    cardId: string;
    customerId: string;
}

export default function CardExtraButton({ customerId, cardId}: CardExtraProps) {
    const { user } = useSession();
    const { theme, setTheme }= useTheme();
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const toggleToolTip = () => {
        setTooltipVisible((prev) => !prev);
    }

    return (
        <div className="relative inline-block">
        <button onClick={toggleToolTip} className="p-2">
          <EllipsisVertical />
        </button>
        {tooltipVisible && (
          <div className="absolute right-0 z-10 mt-2 flex w-40 flex-col items-center justify-start rounded-lg bg-gray-800 p-3 text-white shadow-lg">
           <CardUpdate cardId={cardId} customerId={customerId} />
           <CardDeleteButton cardId={cardId} />
          </div>
        )}
      </div>
    )
}