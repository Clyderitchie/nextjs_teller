"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  ssn: string;
  birthday: Date;
  createdAt: Date;
  phoneNumber: string;
}

export default function SearchField() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    console.log("User input:", query);

    router.push(`/customers?q=${query}`);

    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit} method="GET" action="/customers">
    <div className="relative">
    <Input
          name="q"
          placeholder="Search"
          className="pe-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state on input change
        />
      <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
    </div>
    {loading && <p>Loading...</p>}
  </form>
  );
}
