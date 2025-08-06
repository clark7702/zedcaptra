"use client";
import { Box, Card } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import CustomButton from "../general/Button";
import CustomInput from "../general/CustomInput";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomAlert, { Severity } from "../general/CustomAlert";
import { bankEmail } from "../../constants/Settings";

import CryptoJS from "crypto-js";
import { User } from "../../types/user";

function AMLCode({ user }: { readonly user: User }) {
  const [btnText, setBtnText] = useState("Validate Code");
  const router = useRouter();
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>("success");

  const isButtonDisabled =
    btnText === "Validating..." || btnText === "Please wait..." ? true : false;

  const [transfer, setTransfer] = useState<any>([]);
  const { register, handleSubmit } = useForm();

  // function to handle the form submission
  const onSubmit = async (data) => {
    setBtnText("Validating...");

    if (data.amlCode.toLowerCase() === user?.amlCode.toLowerCase()) {
      sessionStorage.setItem(
        "progress",
        CryptoJS.AES.encrypt(
          "60",
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`
        ).toString()
      );

      setTimeout(() => {
        setAlertMessage("AML code has been validated successfully");
        setAlertSeverity("success");
        setAlertVisibility(true);
        setBtnText("Please wait...");
      }, 1000);

      setTimeout(() => {
        router.replace("/secure/payment/processing");
      }, 2000);
    } else {
      setAlertMessage("Invalid AML code");
      setAlertSeverity("error");
      setAlertVisibility(true);
      setBtnText("Validate Code");
    }
  };

  useEffect(() => {
    const transaction = JSON.parse(
      CryptoJS.AES.decrypt(
        sessionStorage.getItem("transfer"),
        `${process.env.NEXT_PUBLIC_SECRET_KEY}`
      ).toString(CryptoJS.enc.Utf8)
    );

    if (transaction) {
      setTransfer(transaction);
    }
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "600px",
      }}
    >
      <Card variant="outlined" className="mx-4 md:mx-6">
        <div>
          <Box className="bg-primary text-white flex justify-between items-stretch px-7 py-4 md:px-12 font-semibold">
            <h1>Anti-Money Laundering (AML) Code</h1>
            <Link href="/secure/support/open-ticket">
              <span>Help</span>
            </Link>
          </Box>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-10 px-7 md:px-12 lg:py-14"
          >
            <div className="flex flex-col space-y-8">
              <h1>
                In accordance with the Anti-Money Laundering Regulations Act
                2007, You are required a AML Code to continue this transfer.
                Contact customer support 24/7 via{" "}
                <a
                  href={`mailto:${bankEmail}`}
                  className="text-green-600 hover:underline-offset-2"
                >
                  {bankEmail}
                </a>{" "}
                for more info.
              </h1>

              <h1>
                Please enter your AML Code Number (TCN) to complete this
                transfer.
              </h1>

              {alertVisibility && (
                <CustomAlert severity={alertSeverity} message={alertMessage} />
              )}

              <div className="flex flex-col space-y-4">
                <div>
                  <CustomInput
                    required={true}
                    type="text"
                    name="amlCode"
                    placeholder="Eg AML2389X"
                    label={`Anti-Money Laundering Code (AML)`}
                    register={register}
                    autoFocus={true}
                  />
                </div>

                <CustomButton
                  className="w-full md:w-1/2"
                  disabled={isButtonDisabled}
                  text={btnText}
                />
              </div>
            </div>
          </form>
        </div>
      </Card>
    </Box>
  );
}
export default AMLCode;
