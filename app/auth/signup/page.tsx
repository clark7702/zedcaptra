"use client";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import CustomButton from "../../../components/general/Button";
import CustomInput from "../../../components/general/CustomInput";
import CustomSelect from "../../../components/general/CustomSelect";
import CustomSnackBar from "../../../components/general/CustomSnackBars";

import logoimg from "../../../assets/brand/logo.png";
import { useForm } from "react-hook-form";
import { Button, Card, Container, Paper } from "@mui/material";

import { accountTypes, currencies } from "../../../utils/data";

import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import Image from "next/image";
import { User } from "../../../types/user";
// import { sendApplicationSubmmittedEmail } from "../../../lib/mail";
import PasswordInput from "../../../components/general/PasswordInput";
import { SignUpUser } from "../../../lib/actions";

function SignUp() {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();
  const [file, setFile] = useState(null);
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [isPending, startTransition] = useTransition();

  // Handle file upload
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const registerUser = async (user: User) => {
    try {
      const data = await SignUpUser(user);

      if (data.message === "User created successfully") {
        navigate.push("/application/submitted");
      } else {
        setAlertMessage(data.message);
        setAlertSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      console.log(error, "error");
      setAlertMessage(error.message);
      setAlertSeverity("error");
      setOpen(true);
      console.log(error, "error");
    }
  };

  const onSubmit = (data: User) => {
    startTransition(async () => await registerUser(data));
  };
  return (
    <>
      <div className=" min-h-screen py-6">
        <div className="max-w-lg mx-auto lg:max-w-2xl">
          <div className="flex flex-col items-center mb-5">
            <Link href={`/`}>
              <Image
                src={logoimg}
                alt="logo"
                className="object-cover w-44 h-auto"
                priority
              />
            </Link>
          </div>
          <Card
            className="flex flex-col relative rounded-md px-4 sm:px-6 lg:px-8"
            variant="elevation"
          >
            <Paper elevation={5} />
            <div className="mb-5 lg:mb-8 text-center pb-6 border-b border-slate-600">
              <div className="px-4">
                <h1 className="text-center font-bold text-3xl lg:text-4xl mb-6 mt-10">
                  Online Banking
                </h1>
                <p className="text-sm text-center">
                  Your gateway to a world of banking services and products at
                  your fingertips
                </p>

                <p
                  className="font-semibold text-sm
             mt-4"
                >
                  Create an account to get started
                </p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                <div className="grid grid-col-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="">
                    <CustomInput
                      label="Email Address"
                      placeholder={"Enter your email address"}
                      name="email"
                      error={errors.email ? true : false}
                      register={register}
                      required={true}
                    />
                  </div>
                  <div>
                    <CustomInput
                      label="First Name"
                      placeholder={"Enter your first name"}
                      name="firstName"
                      error={errors.firstName ? true : false}
                      register={register}
                      required={true}
                    />
                  </div>
                  <div>
                    <CustomInput
                      label="Middle Name"
                      placeholder={"Enter your middle name"}
                      name="middleName"
                      register={register}
                    />
                  </div>
                  <div>
                    <CustomInput
                      label="Last Name"
                      error={errors.lastName ? true : false}
                      placeholder={"Enter your last name"}
                      name="lastName"
                      register={register}
                      required={true}
                    />
                  </div>

                  <div>
                    <CustomSelect
                      register={register}
                      name={"gender"}
                      error={errors.gender ? true : false}
                      placeholder={"Select Gender"}
                      label={"Gender"}
                      required={true}
                      options={[
                        { title: "Male", value: "male" },
                        { title: "Female", value: "female" },
                        { title: "Other", value: "other" },
                        {
                          value: "Prefer not to say",
                          title: "Prefer not to say",
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <CustomInput
                      label="Username"
                      error={errors.userName ? true : false}
                      placeholder={"Enter your username"}
                      name="userName"
                      register={register}
                      required={true}
                    />
                  </div>

                  <div>
                    <PasswordInput
                      error={errors.password ? true : false}
                      register={register}
                      name="password"
                      label="Login Password"
                      placeholder={"Enter a secure password"}
                      required={true}
                    />
                  </div>

                  <div>
                    <CustomSelect
                      register={register}
                      name={"currency"}
                      required={true}
                      placeholder={"Choose account currency"}
                      label={"Account Currency"}
                      options={currencies}
                      error={errors.currency ? true : false}
                    />
                  </div>
                  <div>
                    <CustomInput
                      error={errors.authPin ? true : false}
                      label="Auth Pin"
                      placeholder={
                        "Enter a 4-6 digit authentication pin (e.g. 1234SD)"
                      }
                      name="authPin"
                      register={register}
                      required={true}
                    />
                  </div>

                  <div>
                    <CustomInput
                      label="Phone Number"
                      error={errors.phoneNumber ? true : false}
                      placeholder={"123-456-7890"}
                      name="phoneNumber"
                      register={register}
                      required={true}
                    />
                  </div>
                  <div>
                    <CustomInput
                      label="Date of Birth"
                      placeholder={"MM/DD/YYYY"}
                      error={errors.dateOfBirth ? true : false}
                      name="dateOfBirth"
                      type={"date"}
                      register={register}
                      required={true}
                    />
                  </div>

                  {/* <div className='flex items-center gap-4'>
                <Button variant='contained' component='label'>
                  Upload Photo
                  <input
                    {...register("photo")}
                    hidden
                    accept='image/*'
                    type='file'
                  />
                </Button>

                {watch("photo")?.length > 0 && (
                  <Image
                    src={URL.createObjectURL(watch("photo")[0])}
                    alt=''
                    width={50}
                    className='rounded-full'
                    height={50}
                  />
                )}
              </div> */}

                  <div>
                    <CustomSelect
                      register={register}
                      required={true}
                      name={"accountType"}
                      error={errors.accountType ? true : false}
                      placeholder={"Select account type"}
                      label={"Account Type"}
                      options={accountTypes}
                    />
                  </div>

                  <div className="col-span-full">
                    <CustomInput
                      label="Full Address"
                      error={errors.address ? true : false}
                      multiline={true}
                      rows={2}
                      placeholder={"Include street, city, state, and zip code"}
                      name="address"
                      register={register}
                      required={true}
                    />
                  </div>

                  <input
                    type="text"
                    hidden
                    {...register("accountStatus")}
                    value={"pending"}
                  />

                  <input
                    value={uuidv4()}
                    hidden
                    type="text"
                    {...register("_id")}
                    id=""
                  />
                </div>

                <div className="w-full">
                  <CustomButton
                    style={{ width: "100%" }}
                    text={isPending ? "Please Wait" : "Sign Up"}
                    disabled={isPending ? true : false}
                  />
                </div>

                <div className="flex space-x-2 text-sm justify-center pb-8">
                  <h1>Already registered to online banking?</h1>
                  <Link href={"/auth/signin"}>
                    <span className="hover:text-green-700"> Sign in</span>
                  </Link>
                </div>
              </form>
            </div>
            <Paper elevation={5} />
          </Card>
        </div>
      </div>

      <CustomSnackBar
        setOpen={setOpen}
        open={open}
        message={alertMessage}
        severity={alertSeverity}
      />
    </>
  );
}

export default SignUp;
