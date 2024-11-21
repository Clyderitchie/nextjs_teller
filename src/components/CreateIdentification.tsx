"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { Input } from "./ui/input";

interface CreateIdentificationProps {
  className?: string;
  formData: {
    identificationNumber: string;
    identificationType: string;
    issuingCountry: string;
    issuingState: string;
    issueDate: string;
    expirationDate: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateIdentification({
  className,
  formData,
  handleChange,
  isSubmitting,
  setIsSubmitting,
}: CreateIdentificationProps) {
  const { user } = useSession();

  return (
    <>
     
    </>
  );
}
