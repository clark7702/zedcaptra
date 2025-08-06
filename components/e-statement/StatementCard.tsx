"use client";
import { Box, Card } from "@mui/material";
import Link from "next/link";
import StatementTable from "./StatementTable";
import CustomButton from "../general/Button";

import { User } from "../../types/user";

function StatementCard({ user }: { user: User }) {
  return (
    <Card variant="outlined" className="">
      <Box
        sx={{
          minHeight: 60,
          maxHeight: 200,
        }}
        className="bg-primary flex justify-between px-4 pt-1 md:px-6 font-semibold items-center text-white"
      >
        <div className="">
          <h1>Transaction Statement:</h1>
        </div>
        <Link href="#">
          <span>Help</span>
        </Link>
      </Box>
      <div className="py-8 px-2">
        <StatementTable user={user} />
        <Link href={"/secure/dashboard"}>
          <span>
            <CustomButton text="Back To Dashboard" />
          </span>
        </Link>
      </div>
    </Card>
  );
}

export default StatementCard;
