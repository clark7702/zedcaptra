"use client";
import { Card, Checkbox } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "../general/Button";
import CustomInput from "../general/CustomInput";
import CustomAlert, { Severity } from "../general/CustomAlert";

import CryptoJS from "crypto-js";

import { bankName } from "../../constants/Settings";

import { v4 as uuidv4 } from "uuid";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { User } from "../../types/user";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "../../types";
import { sendOtpVerificationCode } from "../../lib/mail";

interface Props {
  user: User;
}

function DomesticTransfer({ user }: Props) {
  const [btnText, setBtnText] = useState("Make Transfer >>");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>("success");
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const randomCode = Math.floor(Math.random() * 90000) + 100000;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();

  const { mutate } = useMutation({
    mutationKey: ["sendOtp"],
    mutationFn: async (transaction: Transaction) => {
      return await sendOtpVerificationCode(randomCode, user, transaction);
    },
    onError: (error) => {
      console.log("error", error);
    },

    onSuccess: (data) => {
      console.log("data", data);
      setTimeout(() => {
        router.push("/secure/payment/verify");
      }, 1000);
    },
  });

  const onSubmit = async (data) => {
    if (user.accountStatus !== "active") {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMessage(
        `Your account is ${user.accountStatus}. Please contact support for more info.`
      );
      return;
    }

    setBtnText("Please Wait...");

    if (data.amount > user.availableBalance) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Insufficient funds");
      setBtnText("Make Transfer>>");
      return;
    } else if (data.amount < 1) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Minimum transfer amount is $5");
      setBtnText("Make Transfer>>");
      return;
    } else {
      setAlert(false);
      setBtnText("Please wait...");
      setAlert(true);
      setAlertSeverity("success");
      setAlertMessage(
        "Transfer codes will be required to complete this transfer"
      );

      // encrypt data using a secret key
      const encryptedTransfer = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        `${process.env.NEXT_PUBLIC_SECRET_KEY}`
      );

      const encryptedOtp = CryptoJS.AES.encrypt(
        randomCode.toString(),
        `${process.env.NEXT_PUBLIC_SECRET_KEY}`
      ).toString();
      sessionStorage.setItem("transfer", encryptedTransfer);
      sessionStorage.setItem("otp", encryptedOtp);

      // send otp to email
      mutate(data);
    }
  };

  return (
    <Card variant="outlined" className="mx-4">
      <div className="bg-primary text-white flex justify-between px-6 md:px-10 lg:px-16 py-3 md:py-4 font-semibold">
        <h1>Domestic Transfer</h1>
        <Link href="/secure/support/open-ticket">
          <span>Help</span>
        </Link>
      </div>

      {alert && (
        <CustomAlert
          className={"mt-5 px-6 md:px-10 lg:px-16"}
          severity={alertSeverity}
          message={alertMessage}
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-6 py-10 md:px-10 lg:px-16"
      >
        <h1 className="mb-6">
          <span className="text-red-500">*</span> Required Fields
        </h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <CustomInput
              type="number"
              label="Amout"
              name="amount"
              required={true}
              placeholder="Eg 1000"
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              type="text"
              name="beneficiaryName"
              label="Beneficiary Name"
              placeholder="Enter Full Name"
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              type="text"
              name="beneficiaryAddress"
              label="Beneficiary Address"
              placeholder="Beneficiary Address"
              multiline={true}
              register={register}
            />
          </div>

          <div>
            <CustomInput
              type="text"
              name="accountNumber"
              required={true}
              label="Account Number"
              placeholder="Enter Account Number"
              register={register}
            />
          </div>

          <div>
            <CustomInput
              type="text"
              name="routingNumber"
              required={true}
              label="Wire Routing Number"
              placeholder="Routing Number"
              register={register}
            />
          </div>

          <div>
            <CustomInput
              type="text"
              label="Bank Name"
              name="beneficiaryBankName"
              placeholder="Enter Bank Name"
              required={true}
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              label="Bank Address"
              type="text"
              name="bankAddress"
              placeholder="Enter Bank Address"
              multiline={true}
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              label="Narration"
              type="text"
              name="naration"
              placeholder="Purpose of transfer"
              multiline={true}
              register={register}
            />
          </div>
        </div>

        <input
          type="text"
          hidden
          value={`wire transfer`}
          {...register("transferType")}
        />

        <input
          type="date"
          hidden
          value={new Date().toISOString().split("T")[0]}
          {...register("date")}
        />

        <input type="text" hidden value={"domestic"} {...register("payment")} />

        <input type="text" hidden value={bankName} {...register("bank_name")} />

        <input type="text" hidden value={`US`} {...register("country")} />

        <input type="text" hidden value={`$`} {...register("currency")} />

        <input type="text" hidden value={uuidv4()} {...register("uuid")} />

        <div className="my-8  flex-col flex space-y-4">
          <hr />
          <h1>
            Account Holder Authorization <span className="text-red-500">*</span>
          </h1>

          <div className="flex items-center space-x-2 ">
            <Checkbox
              required={true}
              size="medium"
              checked={checked}
              onChange={(e) => {
                setChecked(!checked);
              }}
            />
            <p className="text-sm">
              I hereby authorize the above named beneficiary to receive this
              funds
            </p>
          </div>
        </div>

        <CustomButton
          text={btnText}
          disabled={!checked || btnText === "Please wait..."}
        />
      </form>
    </Card>
  );
}

export default DomesticTransfer;
