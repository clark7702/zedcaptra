import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@mui/material";
import { ArrowRight, CreditCard, Send, FileText } from "lucide-react";
import Link from "next/link";
import { BiSupport } from "react-icons/bi";

export function QuickActions() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Link href="/secure/payment/wire-transfer">
          <Button className="w-full justify-between">
            <span className="flex items-center">
              <Send className="mr-2 h-4 w-4" />
              Transfer Funds
            </span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>

        <Link href="/secure/transactions">
          <Button className="w-full justify-between">
            <span className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              View Statements
            </span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>

        <Link href="/secure/support/open-ticket">
          <Button className="w-full justify-between">
            <span className="flex items-center">
              <BiSupport className="mr-2 h-4 w-4" />
              Get 24/7 Support
            </span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
