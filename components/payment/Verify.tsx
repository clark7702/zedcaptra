"use client";
import { Box, Card } from "@mui/material";
import { useState, useEffect } from "react";
import CustomInput from "../general/CustomInput";
import CustomButton from "../general/Button";
import { useForm } from "react-hook-form";
import verifysvg from "../../assets/icons/verifyotp.svg";
import CustomAlert, { Severity } from "../general/CustomAlert";

import CryptoJS from "crypto-js";

import { truncateStringBetween } from "../../helpers/snippets";

import { useRouter } from "next/navigation";
import { User } from "../../types/user";
import Image from "next/image";

interface Props {
  user: User;
}

function Verify({ user }: Props) {
  const [btnText, setBtnText] = useState("Verify");
  const { register, handleSubmit } = useForm();
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>("success");
  const [otpCode, setOtpCode] = useState<number | null>(null);
  const router = useRouter();

  const isButtonDisabled =
    btnText === "Validating..." || btnText === "Please wait..." ? true : false;

  const onSubmit = (data) => {
    const inputCode = parseInt(data.otpCode);

    setBtnText("Validating...");
    if (inputCode === Number(otpCode)) {
      sessionStorage.setItem(
        "progress",
        CryptoJS.AES.encrypt(
          "0",
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`
        ).toString()
      );

      setTimeout(() => {
        setAlertMessage("OTP has been validated successfully");
        setAlertSeverity("success");
        setAlertVisibility(true);
        setBtnText("Please wait...");
      }, 1000);

      setTimeout(() => {
        router.push("/secure/payment/processing");
      }, 2000);
    } else {
      setAlertMessage("Invalid OTP code");
      setAlertSeverity("error");
      setAlertVisibility(true);
      setBtnText("Verify");
    }
  };

  useEffect(() => {
    const otp = CryptoJS.AES.decrypt(
      sessionStorage.getItem("otp"),
      `${process.env.NEXT_PUBLIC_SECRET_KEY}`
    ).toString(CryptoJS.enc.Utf8);

    setOtpCode(parseInt(otp));
  }, [otpCode]);

  return (
    <Box
      sx={{
        maxWidth: "600px",
      }}
    >
      <Card
        variant="outlined"
        className="flex flex-col py-10 px-8 md:px-14 lg:px-20"
      >
        <div className="flex flex-col items-center">
          <Image src={verifysvg} alt="verify" width={150} height={150} />
          <h1 className="text-2xl font-bold text-center my-6">
            Verify Your Account
          </h1>
          <p className="mb-10">
            Protecting your funds is our top prority, Please enter the 6 digits
            OTP code sent to{" "}
            {user?.email && truncateStringBetween(user?.email, 3)} {}
            or {}
            {user?.phoneNumber &&
              truncateStringBetween(user?.phoneNumber, 3)}{" "}
            {}
            to proceed this transaction.
          </p>
        </div>

        {alertVisibility && (
          <CustomAlert
            severity={alertSeverity}
            className="mb-5"
            message={alertMessage}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <CustomInput
              name="otpCode"
              label="OTP Code"
              type="text"
              required={true}
              placeholder="Enter OTP Code"
              register={register}
            />
          </div>

          <div>
            <CustomButton text={btnText} disabled={isButtonDisabled} />
          </div>
        </form>
      </Card>
    </Box>
  );
}

export default Verify;
