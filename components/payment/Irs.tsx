"use client";
import { Box, Card } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import CustomButton from "../general/Button";
import CustomAlert, { Severity } from "../general/CustomAlert";
import { useRouter } from "next/navigation";
import CustomInput from "../general/CustomInput";

import CryptoJS from "crypto-js";

import { bankEmail } from "../../constants/Settings";
import { useForm } from "react-hook-form";

import { User } from "../../types/user";

function IRSCode({ user }: { readonly user: User }) {
  const [btnText, setBtnText] = useState("Validate Code");
  const [transfer, setTransfer] = useState<any>(null);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>("success");
  const router = useRouter();

  let dollarUSLocale = Intl.NumberFormat("en-US");

  const isButtonDisabled =
    btnText === "Validating..." || btnText === "Please wait..." ? true : false;

  const { register, handleSubmit } = useForm();

  // function to handle the form submission
  const onSubmit = (data) => {
    setBtnText("Validating...");
    if (data.irs.toLowerCase() === user?.irsCode.toLowerCase()) {
      sessionStorage.setItem(
        "progress",
        CryptoJS.AES.encrypt(
          "38",
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`
        ).toString()
      );
      setTimeout(() => {
        setAlertMessage("IRS code has been validated successfully");
        setAlertSeverity("success");
        setAlertVisibility(true);
        setBtnText("Please wait...");
      }, 1000);

      setTimeout(() => {
        router.push("/secure/payment/processing");
      }, 2000);
    } else {
      setAlertMessage("Invalid IRS code");
      setAlertSeverity("error");
      setAlertVisibility(true);
      setBtnText("Continue >>");
    }
  };

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

  return (
    <Box
      sx={{
        maxWidth: "600px",
      }}
    >
      <Card variant="outlined" className="mx-4 md:mx-6">
        <div>
          <div className="bg-primary text-white flex justify-between items-stretch px-7 py-4 md:px-12 font-semibold">
            <h1> Internal Revenue Service (IRS) Code</h1>
            <Link href="/secure/support/open-ticket">
              <span>Help</span>
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-10 px-7 md:px-12 lg:py-14"
          >
            <div className="flex flex-col space-y-8">
              <h1>
                You are about to make a transfer of {}
                {`${transfer?.currency}${dollarUSLocale.format(
                  parseInt(transfer?.amount)
                )}`}{" "}
                to the account of
                <span className="text-green-600 font-semibold">
                  {" "}
                  {transfer?.accountNumber}
                </span>{" "}
                which requires a IRS code. Contact customer support 24/7 via{" "}
                <a href={`mailto:${bankEmail}`} className="text-green-600">
                  {bankEmail}
                </a>{" "}
                for more information.
              </h1>

              <h1>
                Please enter the IRS code below to continue your transfer.
              </h1>

              {alertVisibility && (
                <CustomAlert severity={alertSeverity} message={alertMessage} />
              )}

              <div className="flex flex-col space-y-4">
                <div>
                  <CustomInput
                    label={`IRS Code`}
                    required
                    type="text"
                    name="irs"
                    placeholder="Eg IRS2389X"
                    register={register}
                    autoFocus={true}
                  />
                </div>
                <CustomButton
                  text={btnText}
                  className="w-full md:w-1/2"
                  disabled={isButtonDisabled}
                />
              </div>
            </div>
          </form>
        </div>
      </Card>
    </Box>
  );
}

export default IRSCode;
