import { clsx, type ClassValue } from "clsx";
import { format, subMonths } from "date-fns";
import { twMerge } from "tailwind-merge";
import { User } from "@/types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLastSixMonthsData(statements: User["statements"]) {
  if (!statements) return [];

  const today = new Date();
  const monthsData = [] as { month: string; credit: number; debit: number }[];

  // Initialize the past six months with zero values
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(today, i);
    const month = format(date, "MMMM"); // Full month name
    const year = format(date, "yyyy");
    monthsData.push({
      month: `${month} ${year}`,
      credit: 0,
      debit: 0,
    });
  }

  // Aggregate transactions into the initialized months
  statements.forEach((statement) => {
    const transactionDate = new Date(statement?.transactionDate);
    const monthYear = format(transactionDate, "MMMM yyyy");
    const monthData = monthsData.find((data) => data.month === monthYear);

    if (monthData) {
      if (!statement.amount) return;
      if (statement.transactionType === "credit") {
        monthData.credit += statement.amount;
      } else if (statement.transactionType === "debit") {
        monthData.debit += statement.amount;
      }
    }
  });

  return monthsData;
}
