"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { User } from "@/types/user";
import { getLastSixMonthsData } from "@/lib/utils";
import { formatNumber } from "@/helpers/snippets";

const chartConfig = {
  credit: {
    label: "Credit",
    color: "hsl(142, 76%, 36%)", // Green color
  },
  debit: {
    label: "Debit",
    color: "hsl(0, 84%, 60%)", // Red color
  },
};

export default function TransactionBarChart({ user }: { user: User }) {
  if (!user?.statements) return null;

  const chartData = getLastSixMonthsData(user.statements);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Report</CardTitle>
        <CardDescription>
          {chartData[0].month} - {chartData[chartData.length - 1].month}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Display first 3 letters of the month
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatNumber.format(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => formatNumber.format(Number(value))}
                  indicator="dashed"
                />
              }
            />
            <Bar dataKey="credit" fill="var(--color-credit)" radius={4} />
            <Bar dataKey="debit" fill="var(--color-debit)" radius={4} />
          </BarChart>
        </ChartContainer>

        <CardFooter className="pt-4 pb-2">
          <div>
            <h6 className="text-sm text-muted-foreground">
              Showing activity for the last 6 months
            </h6>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
