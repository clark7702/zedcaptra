"use client";

import * as React from "react";
import {
  PiggyBank,
  Wallet,
  TrendingUp,
  CreditCard,
  MoreHorizontal,
} from "lucide-react";
import { Label, Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { User } from "@/types/user";
import { formatNumber } from "@/helpers/snippets";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-0))",
    icon: Wallet,
  },
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-1))",
    icon: PiggyBank,
  },
  current: {
    label: "Current",
    color: "hsl(var(--chart-2))",
    icon: Wallet,
  },
  investments: {
    label: "Investments",
    color: "hsl(var(--chart-3))",
    icon: TrendingUp,
  },
  creditCards: {
    label: "Credit Cards",
    color: "hsl(var(--chart-4))",
    icon: CreditCard,
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
    icon: MoreHorizontal,
  },
} satisfies ChartConfig;

export default function PieChartComponent({ user }: { user: User }) {
  const pending = user.availableBalance - user.ledgerBalance;

  // Define the chart data using user's balances
  const chartData = React.useMemo(() => {
    return [
      {
        type: "Available Balance",
        balance: user.availableBalance,
        fill: "hsl(var(--chart-1))",
      },
      {
        type: "Ledger Balance",
        balance: user.ledgerBalance,
        fill: "hsl(var(--chart-2))",
      },
      { type: "Pending", balance: pending, fill: "hsl(var(--chart-3))" },
    ];
  }, [user.availableBalance, user.ledgerBalance, pending]);

  // Calculate the total balance
  const totalBalance = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.balance, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Account Overview</CardTitle>
        <CardDescription>
          Your balance distribution as of {new Date().toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <ChartContainer
            config={chartConfig}
            className="w-full md:w-1/2 aspect-square max-h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  dataKey="balance"
                  nameKey="type"
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      const { cx, cy } = viewBox as any;
                      return (
                        <text
                          x={cx}
                          y={cy}
                          fill="hsl(var(--foreground))"
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          <tspan
                            x={cx}
                            dy="-1em"
                            fontSize="24"
                            fontWeight="bold"
                          >
                            {formatNumber.format(totalBalance)}
                          </tspan>
                          <tspan
                            x={cx}
                            dy="1.5em"
                            fontSize="14"
                            fill="hsl(var(--muted-foreground))"
                          >
                            Total Balance
                          </tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="w-full md:w-1/2 mt-4 md:mt-0 space-y-2">
            {chartData.map((data) => (
              <div
                key={data.type}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <div className="flex items-center space-x-2">
                  {/* Replace the following span with an appropriate icon if available */}
                  <span
                    className="w-5 h-5"
                    style={{ backgroundColor: data.fill }}
                  />
                  <span className="font-medium">{data.type}</span>
                </div>
                {/* <span className="font-bold">${data.balance}</span> */}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 pb-2">
        <p className="text-sm text-muted-foreground">
          This overview provides a snapshot of your financial health across
          various accounts.
        </p>
      </CardFooter>
    </Card>
  );
}
