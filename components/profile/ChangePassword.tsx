"use client";
import { Box, Card } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import CustomInput from "../general/CustomInput";
import CustomSnackBars from "../general/CustomSnackBars";
import { useForm } from "react-hook-form";
import CustomButton from "../general/Button";
import CustomAlert, { Severity } from "../general/CustomAlert";
import { User } from "../../types/user";
import { BiShow } from "react-icons/bi";
import { changePassword, logOut } from "../../lib/actions";

function ChangePassword({ user }: { user: User }) {
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [btnText, setBtnText] = useState("Change Password");
  const [message, setMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [SnackBarsVisibility, setSnackBarsVisibility] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<Severity>("success");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { currentPassword, password, confirmNewPassword } = data;
    setBtnText("Please Wait...");

    if (currentPassword !== user.password) {
      setAlertVisibility(true);
      setMessage("Current password is incorrect");
      setSnackBarSeverity("error");
      setBtnText("Change Password");
      return;
    }
    if (password !== confirmNewPassword) {
      setAlertVisibility(true);
      setMessage("Password does not match");
      setSnackBarSeverity("error");
      setBtnText("Change Password");
    } else {
      setAlertVisibility(false);

      try {
        const result = await changePassword(password, user);

        if (result.message === "Password updated successfully") {
          setSnackBarMessage(
            "Password updated successfully. Please login again"
          );
          setSnackBarSeverity("success");
          setSnackBarsVisibility(true);
          await logOut();
        } else {
          throw new Error("An error occured");
        }

        setBtnText("Change Password");
        reset();
      } catch (error) {
        setSnackBarMessage(error.message);
        setSnackBarSeverity("error");
        setSnackBarsVisibility(true);
        setBtnText("Save Changes");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
      }}
    >
      <Card variant="outlined" className="sm:mx-4">
        <div className="bg-primary flex justify-between px-7 py-4 md:px-12 font-semibold text-white">
          <h1>Change Password</h1>
          <Link href="#">
            <span>Help</span>
          </Link>
        </div>

        {alertVisibility && (
          <CustomAlert
            message={message}
            className="mt-6"
            severity={snackBarSeverity}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-7 md:px-12">
          <div className="flex flex-col space-y-8 mb-10">
            <div className="relative">
              <CustomInput
                label={"Current Password"}
                register={register}
                required={true}
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="********"
              />

              <BiShow
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute bottom-4 right-2 hover:text-green-700"
              />
            </div>

            <div>
              <div className="relative">
                <CustomInput
                  required={true}
                  label={"New Password"}
                  register={register}
                  type={showNewPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  minLength={6}
                />

                <BiShow
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute bottom-4 right-2 hover:text-green-700"
                />
              </div>
              {errors.newPassword && (
                <span className="text-sm text-red-600">
                  Password must be atleast 6 characters
                </span>
              )}
            </div>

            <div>
              <div className="relative">
                <CustomInput
                  required={true}
                  label={"Confirm Password"}
                  register={register}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="********"
                  minLength={6}
                />

                <BiShow
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute bottom-4 right-2 hover:text-green-700"
                />
              </div>
              {errors.confirmNewPassword && (
                <span className="text-sm text-red-600">
                  Password must be atleast 6 characters
                </span>
              )}
            </div>
          </div>

          <CustomButton
            text={btnText}
            disabled={btnText === "Please Wait..." ? true : false}
          />
        </form>
      </Card>
      <CustomSnackBars
        open={SnackBarsVisibility}
        message={snackBarMessage}
        severity={snackBarSeverity}
        setOpen={setSnackBarsVisibility}
      />
    </Box>
  );
}

export default ChangePassword;
