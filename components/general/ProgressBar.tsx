import { useContext, useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

import CryptoJS from "crypto-js";

import { ProgressContext } from "../../context/ProgressBarContext";
import { User } from "../../types/user";
import { postTransaction } from "../../lib/actions";
import { Transaction } from "../../types";

function LinearProgressWithLabel(props: { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress color="primary" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

interface Props {
  user: User;
}

export enum ProgressEnum {
  IRS = 36,
  AML = 58,
  FED = 70,
  IMF = 82,
  TAX = 94,
  submitTransfer = 98,
  SUMMARY = 100,
}

let isPostTransaction = false;

export default function LinearWithValueLabel({ user }: Props) {
  // getting the progress value from the progress context
  const { progress, setProgress } = useContext(ProgressContext);
  const [transfer, setTransfer] = useState<Transaction | null>(null);

  const router = useRouter();

  if (user?.stopTransfer) {
    switch (progress) {
      case ProgressEnum.IRS:
        if (user.irsCode) {
          router.push("/secure/payment/irs");
          break;
        }
      case ProgressEnum.AML:
        if (user.amlCode) {
          router.push("/secure/payment/aml");
          break;
        }
      case ProgressEnum.FED:
        if (user.fedCode) {
          router.push("/secure/payment/fed");
          break;
        }
      case ProgressEnum.IMF:
        if (user.imfCode) {
          router.push("/secure/payment/imf");
          break;
        }
      case ProgressEnum.TAX:
        if (user.taxCode) {
          router.push("/secure/payment/tax");
          break;
        }
      case ProgressEnum.submitTransfer:
        (async () => {
          try {
            if (!isPostTransaction && transfer) {
              isPostTransaction = true;
              const transaction = await postTransaction(transfer, user);

              if (transaction.status !== 200) {
                throw new Error(transaction.message);
              }
            }
          } catch (error) {
            console.error(error, "An error occured, Try again later!");

            router.push("/secure/dashboard");

            return;
          }
        })();
        break;
      case ProgressEnum.SUMMARY:
        router.push("/secure/payment/summary");
        break;
      default:
        break;
    }
  }

  // set interval function to increase the progress value
  useEffect(() => {
    const sessionTransfer = sessionStorage.getItem("transfer");

    if (!sessionTransfer) {
      return router.push("/secure/payment/wire-transfer");
    }

    setTransfer(
      JSON.parse(
        CryptoJS.AES.decrypt(
          sessionTransfer,
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`
        ).toString(CryptoJS.enc.Utf8)
      )
    );

    setInterval(
      () =>
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 1
        ),

      2000
    );
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
