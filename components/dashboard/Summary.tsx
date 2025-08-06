"use client";
import { Card } from "@mui/material";
import React from "react";
import Balance from "./Balance";
import Statitics from "./Statitics";
import Transactions from "./Transactions";
import { User } from "../../types/user";

interface Props {
  readonly user: User;
}

function Summary({ user }: Props) {
  return (
    <div className="flex flex-col space-y-8 sm:space-y-0 space-x-0 sm:space-x-5 md:flex-row md:space-x-6">
      <div className="flex flex-col space-y-6">
        <Balance user={user} />
        <Transactions user={user} />
      </div>
      <div className="flex-1">
        <Statitics user={user} />
      </div>
    </div>
  );
}

export default Summary;
