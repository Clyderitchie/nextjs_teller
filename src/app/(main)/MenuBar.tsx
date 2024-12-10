// TODO: Refactor this so that it will only appear once the user is on a customers Profile and if not then it is hidden

import { Button } from "@/components/ui/button";
import {
  WalletCards,
  Wallet,
  Home,
  Info,
  Settings,
  DollarSign,
  User,
} from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
  customerId: string;
}

export default function MenuBar({ className, customerId }: MenuBarProps) {
  const handleAllAccountsClick = () => {
    console.log("Customer ID:", customerId);
  };
  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Information"
        asChild
      >
        <Link href="information">
          <Info />
          <span className="hidden lg:inline">Information</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Loans"
        asChild
      >
        <Link href="/loans">
          <Wallet />
          <span className="hidden lg:inline">Loans</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Products"
        asChild
      >
        <Link href="/products">
          <WalletCards />
          <span className="hidden lg:inline">Products</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Settings"
        asChild
      >
        <Link href="/settings">
          <Settings />
          <span className="hidden lg:inline">Settings</span>
        </Link>
      </Button>
    </div>
  );
}
