"use client";
import { Box, Button, Card } from "@mui/material";
import { useEffect, useState, useTransition } from "react";

import CryptoJS from "crypto-js";

import {
  capitalizeFirstLetter,
  capitalizeWords,
  capitalizeEveryFirstLetter,
} from "../../helpers/snippets";

import { useRouter } from "next/navigation";
import { Transaction } from "../../types";

const dollarUSLocale = Intl.NumberFormat("en-US");

function Summary() {
  const [isPending, startTransition] = useTransition();
  const [transfer, setTransfer] = useState<Transaction | null>(null);

  const router = useRouter();

  useEffect(() => {
    setTransfer(
      JSON.parse(
        CryptoJS.AES.decrypt(
          sessionStorage.getItem("transfer"),
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`
        ).toString(CryptoJS.enc.Utf8)
      )
    );
  }, []);

  const goTodashboard = () => {
    startTransition(() => {
      router.push("/secure/dashboard");
    });
  };

  return (
    <Card variant='outlined'>
      <div className='px-6 py-2 flex flex-col items-center space-y-10  '>
        <div className='flex flex-col items-center px-10 md:px-20'>
          <iframe src='https://embed.lottiefiles.com/animation/76649'></iframe>
          <h1 className='font-bold text-2xl'>Transaction Completed </h1>
          <p className='text-sm mt-4 text-center'>
            {transfer?.transferType === "domestic"
              ? "We have sent your payment, it should arrive in Beneficiary Account with 1-3 Bank working days"
              : " We have sent your payment, it should arrive in Beneficiary Account within 2-5 Bank working days."}
          </p>
        </div>
        <Box className=''>
          <h1 className='text-center text-xl mb-4 font-bold'>
            Transaction Details
          </h1>
          <p>
            {" "}
            <span className='text-md font-bold'>Transaction ID:</span>{" "}
            {transfer?.uuid}
          </p>
          <p>
            <span className='text-md font-bold'>Transaction Date:</span>{" "}
            {transfer?.date}
          </p>
          <p>
            <span className='text-md font-bold'> Bank Name:</span>{" "}
            {capitalizeEveryFirstLetter(transfer?.beneficiaryBankName)}
          </p>
          <p>
            {" "}
            <span className='text-md font-bold'>Account Number: </span>{" "}
            {transfer?.accountNumber}{" "}
          </p>
          <p>
            <span className='text-md font-bold'> Beneficiary Name:</span>{" "}
            {capitalizeEveryFirstLetter(transfer?.beneficiaryName)}
          </p>
          <p>
            <span className='text-md font-bold'>Transaction Amount:</span>{" "}
            {`${transfer?.currency}${dollarUSLocale.format(
              parseInt(transfer?.amount as string)
            )}`}{" "}
          </p>
          <p>
            <span className='text-md font-bold'> Transaction Status:</span>
            <span className='text-green-700 font-bold'>
              {" "}
              {capitalizeWords("completed")}
            </span>
          </p>
          <p>
            <span className='text-md font-bold'> Naration:</span>{" "}
            {capitalizeFirstLetter(transfer?.naration)}
          </p>
          <p>
            <span className='text-md font-bold'> Transaction Type: </span>

            <span>
              {transfer?.transferType === "wire transfer"
                ? "Wire Transfer"
                : null}
            </span>
          </p>
          <p>
            {" "}
            <span className='text-md font-bold'>Transaction Currency: </span>
            {transfer?.currency}
          </p>
        </Box>
      </div>

      <div className='text-center my-8'>
        <Button variant='contained' onClick={goTodashboard}>
          {isPending ? "Redirecting..." : "Return to Dashboard"}
        </Button>
      </div>
    </Card>
  );
}

export default Summary;
