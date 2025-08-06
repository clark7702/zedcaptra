"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user";
import { CreditCard, AlertCircle } from "lucide-react";
import LinearProgress from "@mui/material/LinearProgress";
import {
  capitalizeFirstLetter,
  formatNumberWithDecimal,
} from "@/helpers/snippets";
import { useMemo } from "react";

export default function AccountSummary({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Account Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <BalanceCard user={user} />
        {/* <div className="grid gap-6 md:grid-cols-2">

          <CreditCardSummary />
        </div> */}
      </CardContent>
    </Card>
  );
}

function BalanceCard({ user }: { user: User }) {
  const ledgerBalance = user.ledgerBalance;
  const availableBalance = user.availableBalance;
  const pendingBalance = user.availableBalance - user.ledgerBalance;

  const progress = availableBalance / ledgerBalance;
  const progressValue = Math.min(Math.round(progress * 100));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {capitalizeFirstLetter(user.accountType)} Account
      </h3>
      <div className="space-y-3">
        <BalanceRow label="Ledger Balance" amount={ledgerBalance} user={user} />
        <BalanceRow
          label="Available Balance"
          amount={availableBalance}
          user={user}
          isPrimary
        />
        <BalanceRow
          label="Pending Balance"
          amount={pendingBalance}
          icon={<AlertCircle className="h-4 w-4 text-yellow-500" />}
          user={user}
        />
      </div>
      <div className="mt-4">
        <LinearProgress variant="determinate" value={progressValue} />
        <p className="text-xs text-gray-500 mt-1">Available balance</p>
      </div>
    </div>
  );
}

function BalanceRow({
  label,
  amount,
  isPrimary = false,
  icon,
  user,
}: {
  label: string;
  amount: number;
  isPrimary?: boolean;
  icon?: React.ReactNode;
  user: User;
}) {
  // format to currency format with 2 decimal places
  const formattedAmount = useMemo(() => {
    return formatNumberWithDecimal(amount);
  }, [amount]);

  return (
    <div className="flex justify-between items-center">
      <span
        className={`text-sm ${isPrimary ? "font-semibold" : "text-gray-600"}`}
      >
        {label}
      </span>
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <span className={`${isPrimary ? "text-lg font-bold" : "text-base"}`}>
          {user.currency}
          {formattedAmount}
        </span>
      </div>
    </div>
  );
}
