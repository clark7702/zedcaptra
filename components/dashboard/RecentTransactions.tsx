import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/helpers/snippets";
import { User } from "@/types/user";

export function RecentTransactions({
  transactions,
}: {
  transactions: User["statements"];
}) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactions && transactions.length > 0 ? (
            transactions.slice(0, 6).map((transaction) => (
              <div key={transaction._id} className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.naration}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.transactionDate}
                  </p>
                </div>
                <div
                  className={`ml-auto font-medium ${transaction.transactionType === "credit" ? "text-green-500" : "text-red-500"}`}
                >
                  {transaction.transactionType === "debit" ? "-" : "+"}
                  {transaction?.amount &&
                    formatNumber.format(transaction.amount.toFixed(2))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No transactions yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
