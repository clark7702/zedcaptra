"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../general/CustomInput";
import CustomButton from "../general/Button";
import { Avatar, Card, IconButton, Paper } from "@mui/material";
import { capitalizeFirstLetter } from "../../helpers/snippets";
import { BiShow } from "react-icons/bi";
import Link from "next/link";
import logoimg from "../../assets/brand/logo.png";

import { useRouter } from "next/navigation";
import { User } from "../../types/user";
import CustomAlert, { Severity } from "../general/CustomAlert";
import { sendLoginNotification } from "../../lib/mail";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import PasswordInput from "../general/PasswordInput";
import { useQuery } from "@tanstack/react-query";
import { getUserIP } from "../../lib/actions";
import Image from "next/image";

interface Props {
  user: User;
}

function Pin({ user }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [btnText, setBtnText] = useState("Verify Pin");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<Severity>("success");
  const [alertVisibility, setAlertVisibility] = useState(false);
  const { register, handleSubmit, setFocus } = useForm();
  const router = useRouter();

  const { data: userLocation } = useQuery({
    queryKey: ["userLocation"],
    queryFn: async () => {
      const userLocation = await getUserIP();

      console.log(userLocation, "userLocation");

      return userLocation;
    },
  });

  console.log(user, "user");

  const onSubmit = async (data) => {
    setBtnText("Verifying...");
    if (data.pin.toLowerCase() === user?.authPin.toLowerCase()) {
      if (userLocation) await sendLoginNotification(user, userLocation);
      router.push("/secure/dashboard");
    } else {
      setAlertMessage("Invalid Pin");
      setAlertSeverity("error");
      setAlertVisibility(true);
      setBtnText("Verify Pin");
    }
  };

  // focus on the pin input when the page loads
  useEffect(() => {
    setFocus("pin");
  }, [setFocus]);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="mb-5">
        <Link href={`/`}>
          <Image src={logoimg} alt="logo" height={50} width={250} />
        </Link>
      </div>
      <Card
        variant="outlined"
        sx={{
          minWidth: 360,
        }}
        className="py-5 rounded-md sm:mx-4 flex flex-col space-y-8 items-center"
      >
        <Paper elevation={5} />
        <div>
          <h1 className="text-xl">
            Welcome back {capitalizeFirstLetter(user?.firstName)}!
          </h1>
        </div>
        <Avatar sx={{ width: 150, height: 150 }} src={user?.imageUrl || ""} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 "
        >
          {alertVisibility && (
            <CustomAlert
              message={alertMessage}
              className="mb-3"
              severity={alertSeverity}
            />
          )}
          <div>
            <PasswordInput
              register={register}
              name="pin"
              placeholder="Enter your pin"
            />
          </div>
          <CustomButton
            disabled={btnText === "Verifying..."}
            text={btnText}
            style={{
              width: "100%",
            }}
          />
        </form>
        <Paper elevation={5} />
      </Card>
    </div>
  );
}

export default Pin;
