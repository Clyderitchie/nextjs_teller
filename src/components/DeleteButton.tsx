"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useState } from "react";
import { deleteCustomerById } from "@/app/(main)/customers/actions";


interface DeleteButtonProps {
    className?: string;
    customerId: string;
}

export default function DeleteButton({ className, customerId }: DeleteButtonProps) {
    const { user } = useSession();
    const { theme, setTheme } = useTheme();
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete(){
        if(!customerId){
            return;
        }

        setIsDeleting(true);

        try {
            await deleteCustomerById(customerId)
            alert("customer was successfully deleted")
        } catch (error) {
            console.error("Failed to delete in delete button component: ", error);
            throw new Error("Failed to delete button delete");
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
        <Button variant="ghost" className="" title="Delete" onClick={handleDelete} disabled={isDeleting}>
            Delete
        </Button>
        </>
    )
}