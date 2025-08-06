"use client";
import { Box, Card } from "@mui/material";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import CustomButton from "../general/Button";
import CustomInput from "../general/CustomInput";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomAlert, { Severity } from "../general/CustomAlert";
import { bankEmail } from "../../constants/Settings";

import CryptoJS from "crypto-js";
import { User } from "../../types/user";
import { countries } from "../../utils/data";

function TAXCode({ user }: { readonly user: User }) {
  const [btnText, setBtnText] = useState("Validate Code");
  const router = useRouter();
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>("success");
  const [transfer, setTransfer] = useState<any>(null);
  const { register, handleSubmit } = useForm();

  // function to handle the form submission
  const isButtonDisabled =
    btnText === "Validating..." || btnText === "Please wait..." ? true : false;

  const onSubmit = (data) => {
    setBtnText("Validating...");
    if (data.tax.toLowerCase() === user.taxCode.toLowerCase()) {
      sessionStorage.setItem(
        "progress",
        CryptoJS.AES.encrypt(
          "96",
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`
        ).toString()
      );

      setTimeout(() => {
        setAlertMessage(
          "Tax Code Number (TCN) has been validated successfully"
        );
        setAlertSeverity("success");
        setAlertVisibility(true);
      }, 1000);

      setTimeout(() => {
        router.replace("/secure/payment/processing");
      }, 2000);
    } else {
      setAlertMessage("Tax Code Number (TCN) is invalid");
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

  const destinationCountry = useMemo(
    () => countries.find((country) => country.value === transfer?.country),
    [transfer]
  );

  return (
    <Box
      sx={{
        maxWidth: "600px",
      }}
    >
      <Card variant="outlined" className="mx-4">
        <div>
          <Box
            sx={{
              minHeight: "50px",
            }}
            className="bg-primary text-white flex justify-between space-x-1 px-7 py-4 md:px-12 font-semibold"
          >
            <h1>Tax Code Number (TCN)</h1>
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
                Due to your Beneficiary country{" "}
                <span className="text-green-600">
                  {destinationCountry?.title}
                </span>
                , You will need to provide an Tax Code Number (TCN) to complete
                this transfer.
              </h1>

              <h1>
                Please enter the Tax Code Number (TCN) to complete your
                transfer. Contact customer support 24/7 via{" "}
                <a href={`mailto:${bankEmail}`} className="text-green-600">
                  {bankEmail}
                </a>{" "}
                for more info.
              </h1>

              {alertVisibility && (
                <CustomAlert severity={alertSeverity} message={alertMessage} />
              )}
              <div className="flex flex-col space-y-4">
                <div>
                  <CustomInput
                    required
                    type="text"
                    name="tax"
                    placeholder="TAX-0038X021"
                    label="Tax Code Number (TCN)"
                    register={register}
                    autoFocus={true}
                  />
                </div>
                <CustomButton
                  text={btnText}
                  disabled={isButtonDisabled}
                  className="w-full md:w-1/2"
                />
              </div>
            </div>
          </form>
        </div>
      </Card>
    </Box>
  );
}

export default TAXCode;
