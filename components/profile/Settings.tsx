"use client";
import { Avatar, Card } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomInput from "../general/CustomInput";
import CustomButton from "../general/Button";
import CustomSnackBar from "../general/CustomSnackBars";

import { capitalizeFirstLetter } from "../../helpers/snippets";

import { useForm } from "react-hook-form";

import { User } from "../../types/user";
import { Severity } from "../general/CustomAlert";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

function Settings({ user }: { user: User }) {
  const router = useRouter();
  const [btnText, setBtnText] = useState("Save Changes");
  const [lastLogin, setLastLogin] = useState<Date | null>(null);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<Severity>("success");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      middleName: user?.middleName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phoneNumber,
      address: user?.address,
    },
  });

  useEffect(() => {
    setLastLogin(new Date());
  }, [user]);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data) => {
      setBtnText("Please Wait...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/user/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data,
            id: user._id,
          }),
        }
      );

      const res = await response.json();

      return res;
    },

    onSuccess(data) {
      setSnackBarMessage(data.message);
      setSnackBarSeverity("success");
      setOpenSnackBar(true);
    },

    onError(error) {
      console.log(error, "error");
      setSnackBarMessage("An error occured while updating user");
      setSnackBarSeverity("error");
    },

    onSettled() {
      setBtnText("Save Changes");
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  return (
    <>
      <Card variant='outlined' className='md:mx-6'>
        <div className='bg-primary flex justify-between px-6 py-3 md:px-10 lg:px-16 font-semibold text-white'>
          <h1>Customer Profile</h1>
          <Link href='#'>
            <span>Help</span>
          </Link>
        </div>

        <div className='mt-8 flex flex-col space-y-6 px-6 md:px-10 lg:px-16'>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={`${user?.imageUrl || ""} `}
            className='mx-auto'
          />
          <div className='flex flex-col items-center text-center space-y-1'>
            <h1 className='text-sm'>
              Joined:
              <span className='ml-2'>
                {new Date(user?.openingDate).toLocaleDateString("en-US", {})}
              </span>
            </h1>

            <h1 className='text-sm'>
              Last Login:{" "}
              <span className=''>{lastLogin?.toLocaleString()}</span>
            </h1>

            <h1 className='text-sm'>
              Account Number:{" "}
              <span className='font-semibold text-green-700'>
                {user?.accountNumber}
              </span>{" "}
            </h1>

            <h1 className='text-sm'>
              Account Status:{" "}
              <span className=''>
                {capitalizeFirstLetter(user?.accountStatus)}
              </span>
            </h1>
          </div>
          <hr className='border-slate-700' />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='pb-10 px-6 py-8 md:px-10 lg:px-16'>
          <div className=''>
            <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div>
                <CustomInput
                  label='First Name'
                  name={"firstName"}
                  defaultValue={user?.firstName}
                  placeholder={user?.firstName}
                  register={register}
                />
              </div>

              <div>
                <CustomInput
                  label='Middle Name'
                  name={"middleName"}
                  placeholder={user?.middleName}
                  defaultValue={user?.middleName}
                  register={register}
                />
              </div>
              <div>
                <CustomInput
                  label='Last Name'
                  name={"lastName"}
                  placeholder={user?.lastName}
                  defaultValue={user?.lastName}
                  register={register}
                />
              </div>
              <div>
                <CustomInput
                  label='Username'
                  name={"name"}
                  placeholder={user?.userName}
                  defaultValue={user?.userName}
                  register={register}
                />
              </div>

              <div>
                <CustomInput
                  label='Work/Employmenent'
                  name={"occupation"}
                  placeholder={user?.occupation}
                  defaultValue={user?.occupation}
                  register={register}
                />
              </div>
            </div>
          </div>

          <div className='my-8 flex flex-col space-y-5'>
            <hr className='border-slate-700' />
            <h1 className='text-xl font-bold'>Contact Information</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div>
                <CustomInput
                  label='Mobile Number'
                  name={"mobile"}
                  placeholder={user?.phoneNumber}
                  defaultValue={user?.phoneNumber}
                  register={register}
                />
              </div>

              {/* <div>
                    <CustomInput
                      label='Address'
                      name={"address"}
                      multiline={true}
                      placeholder={user?.address}
                      defaultValue={user?.address}
                      register={register}
                    />
                  </div> */}
            </div>
          </div>
          <CustomButton text={btnText} disabled={isLoading} />
        </form>
      </Card>
      <CustomSnackBar
        message={snackBarMessage}
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        severity={snackBarSeverity}
      />
    </>
  );
}

export default Settings;
