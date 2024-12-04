"use client";

// TODO: Bring in action file to handle creating a new customer for data below only

import { submitCustomer } from "@/app/(main)/create/customer/actions"; // Adjust the import path as necessary
import { useSession } from "@/app/(main)/SessionProvider";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface CreateCustomerProps {
  className?: string;
  formData: {
    CustomerName: string;
    phoneNumber: string;
    Email: string;
    Address: string;
    SSN: string;
    birthday: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateNewCustomer({
  className,
  formData,
  handleChange,
  isSubmitting,
  setIsSubmitting,
}: CreateCustomerProps) {
  const { user } = useSession();
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const birthday = new Date(formData.birthday).toISOString();
    if (isNaN(Date.parse(birthday))) {
      console.error("Invalid date format for birthday");
      setIsSubmitting(false);
      return;
    }

    const customerData = {
      name: formData.CustomerName,
      email: formData.Email,
      phone: formData.phoneNumber,
      address: formData.Address,
      ssn: formData.SSN,
      birthday: birthday,
    };

    try {
      const newCustomer = await submitCustomer(customerData);
      console.log("New customer created: ", newCustomer);
      router.push(`/customers/${newCustomer.id}`);
    } catch (e) {
      console.error("Error with creating customer: ", e);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className={`${className}`}>
        <h2 className="text-center text-2xl">New Customer Information:</h2>
        <div>
          <Input
            name="CustomerName"
            placeholder="Name"
            value={formData.CustomerName}
            onChange={handleChange}
            className="my-7 min-w-full"
          />
          <Input
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
            className="my-7 min-w-full"
          />
          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="my-7 min-w-full"
          />
          <Input
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className="my-7 min-w-full"
          />
          <Input
            name="Address"
            placeholder="Address"
            value={formData.Address}
            onChange={handleChange}
            className="my-7 min-w-full"
          />
          <Input
            name="SSN"
            placeholder="SSN"
            value={formData.SSN}
            onChange={handleChange}
            className="my-7 min-w-full"
          />
        </div>
        <button
          type="button"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
}
