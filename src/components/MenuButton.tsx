"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import DeleteButton from "./DeleteButton";

interface MenuButtonProps {
    className?: string;
    customerId: string;
}

export default function MenuButton({ className, customerId }: MenuButtonProps) {
    const { user } = useSession();
    const { theme, setTheme } = useTheme();
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const toggleTooltip = () => {
        setTooltipVisible((prev) => !prev);
    };

    return (
        <div className="relative inline-block">
            {/* Button with onClick to toggle tooltip */}
            <button onClick={toggleTooltip} className={`p-2 ${className}`}>
                <Ellipsis />
            </button>

            {/* Tooltip */}
            {tooltipVisible && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg bg-gray-800 text-white p-3 shadow-lg z-10">
                    {/* Tooltip content */}
                   <DeleteButton customerId={customerId}/>
                </div>
            )}
        </div>
    );
}
