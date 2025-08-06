"use client";
import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineNumber, AiOutlineAccountBook } from "react-icons/ai";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";

import { capitalizeFirstLetter } from "../../helpers/snippets";

import { BiError } from "react-icons/bi";
import { User } from "../../types/user";
import { DollarSignIcon } from "lucide-react";

interface Props {
  readonly user: User;
}

function Balance({ user }: Props) {
  const [randomNumber, setRandomNumber] = useState(0);
  const [randomNumber2, setRandomNumber2] = useState(0);
  const [randomNumber3, setRandomNumber3] = useState(0);

  const dollarUSLocale = Intl.NumberFormat("en-US");
  const dollarIndianLocale = Intl.NumberFormat("en-IN");

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomNumber(Math.floor(Math.random() * 1000));
      setRandomNumber2(Math.floor(Math.random() * 10));
      setRandomNumber3(Math.floor(Math.random() * 100));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card variant="outlined" className="p-5">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="font-bold text-md">Avaliable Balance</h1>
            <h1>
              {user?.currency}
              {dollarUSLocale.format(user?.availableBalance)}
            </h1>
          </div>
          <div>
            <DollarSignIcon className="text-4xl text-green-600 cursor-pointer" />
          </div>
        </div>
        <div className="mt-5">
          <h1>
            <span className="text-green-600">+0.{randomNumber3}%</span> vs. last
            month
          </h1>
        </div>
      </Card>
      <Card variant="outlined" className="p-5">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="font-bold text-md">Ledger Balance</h1>
            <h1>
              {user?.currency}
              {dollarUSLocale.format(user?.ledgerBalance)}
            </h1>
          </div>
          <div>
            <MdOutlineAccountBalanceWallet className="text-4xl hover:text-green-600 cursor-pointer" />
          </div>
        </div>
        <div className="mt-5">
          <h1>
            <span className="text-green-600">+1.{randomNumber2}%</span> vs. last
            month
          </h1>
        </div>
      </Card>
      <Card variant="outlined" className="p-5">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="font-bold text-md">Ledger Balance</h1>
            <h1>
              {user?.currency}
              {dollarUSLocale.format(user?.ledgerBalance)}
            </h1>
          </div>
          <div>
            <MdOutlineAccountBalanceWallet className="text-4xl hover:text-green-600 cursor-pointer" />
          </div>
        </div>
        <div className="mt-5">
          <h1>
            <span className="text-green-600">+1.{randomNumber2}%</span> vs. last
            month
          </h1>
        </div>
      </Card>
    </div>
  );
}

export default Balance;
