"use client";
import { useState } from "react";
import CustomAlert, { Severity } from "../general/CustomAlert";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CustomInput from "../general/CustomInput";
import Link from "next/link";
import { Button, Card } from "@mui/material";
import { useSearchParams } from "next/navigation";
import PasswordInput from "../general/PasswordInput";
import { useRouter } from "next/navigation";

function SignInForm() {
  const useSearchParam = useSearchParams();
  const isSignError = useSearchParam?.get("error");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    isSignError ? "Invalid Credentials" : ""
  );
  const [alertSeverity, setAlertSeverity] = useState<Severity>("error");
  const [alertVisibility, setAlertVisibility] = useState(
    isSignError ? true : false
  );
  const [btnText, setBtnText] = useState("Login");
  const router = useRouter();
  const isButtonDisabled = btnText === "Logging in..." ? true : false;

  const signInUser = async (data) => {
    setBtnText("Logging in...");
    setAlertMessage("");
    setAlertVisibility(false);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result, "result in signInUser");

      if (result.message === "Login successful") {
        router.push("/auth/pin_verification");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      console.error(error, "error");
      throw error;
    }
  };

  const { mutate, isLoading } = useMutation(
    async (data) => await signInUser(data),
    {
      onError: (error: any) => {
        console.log(error, "error");

        setAlertMessage(error?.message);
        setAlertSeverity("error");
        setAlertVisibility(true);
        setBtnText("Login");
      },
    }
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 450,
      }}
      className="px-4 sm:px-12 mx-4 py-2 rounded-md"
    >
      <div>
        <h1 className="text-center font-bold text-3xl lg:text-4xl mb-6 mt-10">
          Online Banking
        </h1>
        <p className="text-sm text-center">
          Please enter your email address and password to login to your account
        </p>
      </div>

      <form
        className="my-6 flex flex-col space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {alertVisibility && (
          <CustomAlert message={alertMessage} severity={alertSeverity} />
        )}
        <div>
          <CustomInput
            error={errors.email ? true : false}
            label="Email Address"
            placeholder={"Enter your email address"}
            name="email"
            register={register}
            required={true}
          />
        </div>

        <div>
          <PasswordInput
            error={errors.password ? true : false}
            register={register}
            name="password"
            label="Password"
            required={true}
          />
        </div>
        <Button type="submit" variant="contained" disabled={isButtonDisabled}>
          {btnText}
        </Button>

        <div className="flex space-x-2 text-sm justify-center pt-5">
          <h1>Not registered to online banking?</h1>
          <Link href={"/auth/signup"}>
            <span className="hover:text-green-700"> Sign up</span>
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default SignInForm;
