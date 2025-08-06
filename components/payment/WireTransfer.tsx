"use client";
import { Card, Checkbox, Paper } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "../general/Button";
import CustomInput from "../general/CustomInput";
import CustomSelect from "../general/CustomSelect";
import CustomAlert, { Severity } from "../general/CustomAlert";
import { countries, currencies } from "../../utils/data";
import { bankName } from "../../constants/Settings";

import CryptoJS from "crypto-js";

import { v4 as uuidv4 } from "uuid";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { User } from "../../types/user";
import { sendOtpVerificationCode } from "../../lib/mail";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "../../types";

interface Props {
  user: User;
}

function WireTransfer({ user }: Props) {
  const [btnText, setBtnText] = useState("Make Transfer >>");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>("success");
  const router = useRouter();
  const [seletedCountry, setSelectedCountry] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [checked, setChecked] = useState(false);
  const otpCode = Math.floor(Math.random() * 90000) + 100000;

  const isButtonDisabled = !checked || btnText === "Please Wait...";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();

  const { mutate } = useMutation({
    mutationKey: ["sendOtp"],
    mutationFn: async (transaction: Transaction) => {
      return await sendOtpVerificationCode(otpCode, user, transaction);
    },
    onError: (error) => {
      console.log("error", error);
    },

    onSuccess: (data) => {
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
    } else if (data.amount < 50) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Minimum transfer amount is $50");
      setBtnText("Make Transfer>>");
    } else {
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
        otpCode.toString(),
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
      <div className="bg-primary text-white py-3 md:py-4 flex justify-between px-6 sm:px-12 md:px-10 lg:px-16 pt-3 font-semibold">
        <h1 className="">International Transfer</h1>
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
              required={true}
              type="number"
              label="Amount"
              className=""
              placeholder="Eg 1000"
              name={"amount"}
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              type="text"
              label="Beneficiary Name"
              name={"beneficiaryName"}
              placeholder="Beneficiary Name"
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              type="text"
              label="Beneficiary Address"
              name={"beneficiaryAddress"}
              placeholder="Enter Address"
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              type="number"
              label="Account Number"
              name={"accountNumber"}
              placeholder="Enter Account Number"
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              type="text"
              label="Bank Name"
              placeholder="Bank Name"
              name={"beneficiaryBankName"}
              register={register}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              type="text"
              label="Bank Address"
              placeholder="Bank Address"
              name={"bankAddress"}
              register={register}
            />
          </div>

          <div>
            <CustomSelect
              register={register}
              required={true}
              label={`Select Country`}
              name={"country"}
              options={countries}
              onChange={(e) => setSelectedCountry(e.target.value)}
            />
          </div>

          <div>
            <CustomInput
              required={true}
              type="text"
              label="Swift Code"
              placeholder="Enter Swift Code"
              name={"swiftCode"}
              register={register}
            />
          </div>

          <div>
            <CustomInput
              type="number"
              label="IBAN / Routing Number"
              placeholder="Routing Num."
              name={"routingNumber"}
              register={register}
            />
          </div>

          <div>
            <CustomSelect
              required={true}
              register={register}
              label={`Currency`}
              name={"currency"}
              options={currencies}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            />
          </div>

          <input
            type="text"
            hidden
            value={`wire transfer`}
            {...register("transferType")}
          />
          <input
            type="text"
            hidden
            value={"international"}
            {...register("payment")}
          />
          <input
            type="text"
            hidden
            value={bankName}
            {...register("bank_name")}
          />

          <input
            type="date"
            hidden
            value={new Date().toISOString().split("T")[0]}
            {...register("date")}
          />

          <input
            type="text"
            hidden
            value={seletedCountry}
            {...register("country")}
          />

          <input type="text" hidden value={uuidv4()} {...register("uuid")} />

          <div className="flex flex-col space-y-2">
            <h1>Transaction Type</h1>
            <Paper elevation={4} className="py-2 text-center font-semibold">
              Wire Transfer
            </Paper>
          </div>

          <div>
            <CustomInput
              type="text"
              multiline={true}
              label="Narration / Purpose"
              placeholder="Purpose of Transfer"
              name={"naration"}
              register={register}
              required={true}
            />
          </div>
        </div>

        <div className="my-8 flex-col flex space-y-4">
          <hr />
          <h1>
            Account Holder Authorization <span className="text-red-500">*</span>
          </h1>

          <div className="flex items-center">
            <Checkbox
              required={true}
              size="medium"
              checked={checked}
              onChange={(e) => {
                setChecked(!checked);
              }}
            />
            <p>
              I hereby authorize the above named beneficiary to receive this
              funds
            </p>
          </div>
        </div>

        <CustomButton text={btnText} disabled={isButtonDisabled} />
      </form>
    </Card>
  );
}

export default WireTransfer;
